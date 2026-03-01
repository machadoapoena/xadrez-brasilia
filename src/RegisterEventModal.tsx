
import React, { useState, useRef } from 'react';
import { X, PlusCircle, Send, CheckCircle, AlertCircle, UploadCloud } from 'lucide-react';
import { supabase } from './services/supabaseClient';



interface RegisterEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BR_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const RegisterEventModal = ({ isOpen, onClose }: RegisterEventModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    types: [] as string[],
    date: '',
    time: '',
    location: '',
    city: '',
    state: 'DF',
    prize: '',
    contact: '', // Novo campo de contato
    link_details: '',
    link_registration: '',
    link_chessresults: '',
    rtg_fide: false,
    rtd_cbx: false,
    rtg_lbx: false,
    status: 'enviado'
  });

  if (!isOpen) return null;

  const handleTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(type) 
        ? prev.types.filter(t => t !== type) 
        : [...prev.types, type]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("A imagem deve ter no máximo 5MB");
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      console.log('Iniciando upload da imagem para o bucket xadrez-brasilia...');
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `event-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('xadrez-brasilia')
        .upload(filePath, file, {
          cacheControl: '31536000',
          upsert: false
        });

      if (uploadError) {
        console.error('Erro retornado pelo Supabase Storage:', uploadError);
        throw new Error(`Erro no Storage: ${uploadError.message}`);
      }

      const { data: publicData } = supabase.storage
        .from('xadrez-brasilia')
        .getPublicUrl(filePath);

      return publicData.publicUrl;
    } catch (err: any) {
      console.error('Falha crítica no processo de upload:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.types.length === 0) {
      setError("Selecione ao menos um tipo de torneio (Blitz, Rapid, etc)");
      return;
    }
    if (!selectedFile) {
      setError("Por favor, selecione uma imagem para o banner do evento.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(selectedFile);
      if (!imageUrl) throw new Error('Falha ao gerar URL da imagem.');

      const { error: supabaseError } = await supabase
        .from('events')
        .insert([{
          name: formData.name,
          description: formData.description,
          types: formData.types,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          city: formData.city,
          state: formData.state,
          prize: formData.prize,
          contact: formData.contact, // Inclusão do contato no insert
          link_details: formData.link_details,
          link_registration: formData.link_registration,
          link_chessresults: formData.link_chessresults,
          rtg_fide: formData.rtg_fide,
          rtd_cbx: formData.rtd_cbx,
          rtg_lbx: formData.rtg_lbx,
          image_url: imageUrl,
          status: 'enviado'
        }]);

      if (supabaseError) throw new Error(`Erro no Banco de Dados: ${supabaseError.message}`);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          name: '',
          description: '',
          types: [],
          date: '',
          time: '',
          location: '',
          city: '',
          state: 'DF',
          prize: '',
          contact: '',
          link_details: '',
          link_registration: '',
          link_chessresults: '',
          rtg_fide: false,
          rtd_cbx: false,
          rtg_lbx: false,
          status: 'enviado'
        });
        setSelectedFile(null);
        setImagePreview(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-bounce-in">
        <header className="p-8 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <PlusCircle className="text-green-600" size={28} />
            <h3 className="text-2xl font-brand text-blue-900 uppercase tracking-tight">Cadastrar Novo Evento</h3>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
            <X size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
          {success ? (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle size={56} />
              </div>
              <h4 className="text-3xl font-brand text-blue-900 mb-2">Evento Enviado!</h4>
              <p className="text-gray-500 font-medium">Sua solicitação foi gravada com sucesso e está aguardando aprovação.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 flex flex-col gap-1 text-red-700 animate-shake">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span className="text-sm font-black uppercase tracking-tight">Erro ao Salvar</span>
                  </div>
                  <p className="text-xs ml-7 opacity-80">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Banner do Evento (Obrigatório)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative w-full h-48 rounded-3xl border-4 border-dashed transition-all flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden ${
                    imagePreview ? 'border-green-600 bg-gray-50' : 'border-gray-100 bg-gray-50 hover:border-yellow-400 hover:bg-white'
                  }`}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <CheckCircle size={40} className="text-green-600" />
                        <span className="text-green-600 font-black text-xs uppercase">Imagem Selecionada</span>
                        <span className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Clique para alterar</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-300">
                        <UploadCloud size={32} />
                      </div>
                      <div className="text-center">
                        <span className="block text-blue-900 font-bold text-sm">Clique para fazer upload</span>
                        <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">PNG, JPG ou WEBP (Máx. 5MB)</span>
                      </div>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Nome do Evento</label>
                    <input required type="text" placeholder="Ex: Aberto de Brasília 2026" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-blue-900 focus:ring-2 focus:ring-yellow-400 outline-none font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-full">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Descrição do Evento</label>
                    <textarea required placeholder="Detalhes do torneio, formato, regras especiais, etc." rows={4} className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-blue-900 focus:ring-2 focus:ring-yellow-400 outline-none font-medium resize-y" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Tipo (Selecione um ou mais)</label>
                    <div className="flex flex-wrap gap-2">
                      {['Blitz', 'Rapid', 'Pensado', '960'].map(type => (
                        <button key={type} type="button" onClick={() => handleTypeToggle(type)} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border-2 transition-all ${formData.types.includes(type) ? 'bg-blue-900 border-blue-900 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400'}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Data</label>
                    <input required type="date" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none font-medium" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Hora</label>
                    <input required type="time" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none font-medium" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Local</label>
                  <input required type="text" placeholder="Ex: Clube de Xadrez Brasília" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none font-medium" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Cidade</label>
                    <input required type="text" placeholder="Brasília" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none font-medium" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Estado</label>
                    <select required className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none font-medium appearance-none" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                      {BR_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Premiação</label>
                    <input required type="text" placeholder="Ex: R$ 1.000,00" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none font-medium" value={formData.prize} onChange={e => setFormData({...formData, prize: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-3 gap-6 col-span-full">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="rtg_fide" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" checked={formData.rtg_fide} onChange={e => setFormData({...formData, rtg_fide: e.target.checked})} />
                      <label htmlFor="rtg_fide" className="text-sm font-medium text-gray-700">Rating FIDE</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="rtd_cbx" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" checked={formData.rtd_cbx} onChange={e => setFormData({...formData, rtd_cbx: e.target.checked})} />
                      <label htmlFor="rtd_cbx" className="text-sm font-medium text-gray-700">Rating CBX</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="rtg_lbx" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" checked={formData.rtg_lbx} onChange={e => setFormData({...formData, rtg_lbx: e.target.checked})} />
                      <label htmlFor="rtg_lbx" className="text-sm font-medium text-gray-700">Rating LBX</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">WhatsApp de Contato (DDI + DDD)</label>
                    <input required type="tel" placeholder="Ex: 5561988887777" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 outline-none font-medium" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Link Detalhes</label>
                    <input type="url" placeholder="https://..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-xs outline-none" value={formData.link_details} onChange={e => setFormData({...formData, link_details: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Link Inscrição</label>
                    <input type="url" placeholder="https://..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-xs outline-none" value={formData.link_registration} onChange={e => setFormData({...formData, link_registration: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">ChessResults</label>
                    <input type="url" placeholder="https://..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-xs outline-none" value={formData.link_chessresults} onChange={e => setFormData({...formData, link_chessresults: e.target.value})} />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-5 rounded-2xl flex items-center justify-center gap-4 transition-all transform font-black uppercase tracking-[0.2em] shadow-xl ${
                  loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed scale-95' : 'bg-green-600 hover:bg-green-500 text-white hover:scale-[1.02] active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} /> 
                    <span>Enviar Evento</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
        
        <footer className="p-4 bg-gray-50 border-t border-gray-100 text-center shrink-0">
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
            Ao enviar, você concorda que o evento passará por moderação manual antes de ser publicado.
          </p>
        </footer>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};
