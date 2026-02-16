
import React, { useState } from 'react';
import { Trophy, MapPin, Clock, ExternalLink, RotateCcw, BarChart2, MessageCircle } from 'lucide-react';
import QRCode from 'qrcode';
import { Tournament } from './constants.tsx';
import { getBadgeStyles } from './utils.tsx';

export const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const hasContact = !!tournament.contact;

  const generateQRCode = async () => {
    if (!tournament.chessResultsLink || qrCodeDataUrl || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(tournament.chessResultsLink, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrCodeDataUrl(url);
    } catch (err) {
      console.error("Erro ao gerar QR Code:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFlip = () => {
    const nextState = !isFlipped;
    setIsFlipped(nextState);
    if (nextState && !qrCodeDataUrl) {
      generateQRCode();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasContact) return;
    
    const message = `Olá! Gostaria de tirar uma dúvida sobre o torneio "${tournament.name}" que vi no portal Xadrez Brasília.`;
    const url = `https://wa.me/${tournament.contact}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="w-full max-w-[320px] h-[410px] perspective-1000 cursor-pointer group"
      onClick={handleFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Lado da Frente */}
        <div className="absolute inset-0 backface-hidden flex flex-col rounded-[32px] overflow-hidden shadow-2xl bg-white border-4 border-yellow-400 isolate transform-gpu force-gpu-clip">
          <img src={tournament.image} alt={tournament.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 backface-hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/40 to-transparent" />
          
          <div className="absolute top-4 left-4 flex flex-col items-center">
            <div className="bg-yellow-400 text-blue-900 px-4 py-2.5 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center justify-center min-w-[65px]">
              <span className="text-4xl font-black font-brand block leading-none">{tournament.day}</span>
              <span className="text-[11px] font-bold uppercase tracking-widest mt-1">{tournament.month}</span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {tournament.type.map((t) => (
                <span key={t} className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getBadgeStyles(t)}`}>
                  {t}
                </span>
              ))}
              <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1">
                <Trophy size={10} className="text-yellow-400" /> {tournament.prize}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2">{tournament.name}</h3>
            <div className="flex flex-col gap-1 text-gray-200 text-[10px] font-medium mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={11} className="text-yellow-400" /> {tournament.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={11} className="text-yellow-400" /> {tournament.time}
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              {tournament.link ? (
                <a 
                  href={tournament.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleButtonClick}
                  className="w-full py-2 bg-yellow-400 text-blue-900 font-black rounded-xl text-[9px] uppercase tracking-[0.1em] hover:bg-white transition-all transform hover:translate-y-[-1px] flex items-center justify-center cursor-pointer"
                >
                  Ver Detalhes
                </a>
              ) : (
                <div className="w-full py-2 bg-gray-300 text-gray-500 font-black rounded-xl text-[9px] uppercase tracking-[0.1em] flex items-center justify-center cursor-not-allowed opacity-80" onClick={handleButtonClick}>
                  Detalhes em Breve
                </div>
              )}

              <div className="flex gap-1.5">
                {tournament.registrationLink ? (
                  <a 
                    href={tournament.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleButtonClick}
                    className="flex-1 py-2 bg-green-600 text-white font-black rounded-xl text-[9px] uppercase tracking-[0.1em] hover:bg-green-500 transition-all transform hover:translate-y-[-1px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-900/20"
                  >
                    <ExternalLink size={11} /> Inscrição
                  </a>
                ) : (
                  <div className="flex-1 py-2 bg-gray-300 text-gray-500 font-black rounded-xl text-[9px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 cursor-not-allowed opacity-80" onClick={handleButtonClick}>
                    <ExternalLink size={11} className="opacity-40" /> Breve
                  </div>
                )}
                
                <button 
                  onClick={hasContact ? handleWhatsAppClick : handleButtonClick}
                  className={`flex-1 py-2 ${hasContact ? 'bg-[#25D366] hover:bg-[#20ba59] shadow-[#25D366]/20' : 'bg-gray-300 cursor-not-allowed opacity-80 shadow-none'} text-white font-black rounded-xl text-[9px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-all transform ${hasContact ? 'hover:translate-y-[-1px] active:scale-95 shadow-lg' : ''}`}
                  title={hasContact ? "Dúvidas no WhatsApp" : "Contato indisponível"}
                >
                  <MessageCircle size={14} className={hasContact ? "" : "opacity-40"} /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lado de Trás */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col rounded-[32px] overflow-hidden shadow-2xl bg-blue-900 border-4 border-green-600 p-8 text-center justify-center items-center">
          
          <div className="mb-6 relative">
            {qrCodeDataUrl ? (
              <div className="p-3 bg-white rounded-3xl shadow-2xl border-2 border-green-600/30">
                <img 
                  src={qrCodeDataUrl} 
                  alt={`QR Code para ${tournament.name}`} 
                  className="w-24 h-24 object-contain"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                  <ExternalLink size={12} />
                </div>
              </div>
            ) : (
              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 transition-colors">
                {isGenerating ? (
                   <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <BarChart2 size={40} className="text-white/20" />
                )}
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-brand text-white mb-2 uppercase tracking-tight">{tournament.name}</h3>
          <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-8">
            {qrCodeDataUrl ? 'Aponte a câmera para os resultados' : 'Informações Técnicas & Resultados'}
          </p>

          <div className="w-full space-y-3">
            {tournament.chessResultsLink ? (
              <a 
                href={tournament.chessResultsLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleButtonClick}
                className="w-full py-4 bg-green-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-green-500 transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                <BarChart2 size={16} /> Abrir Chess-Results
              </a>
            ) : (
              <div className="w-full py-4 bg-white/5 border border-white/10 text-white/40 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                Link Chess-Results Indisponível
              </div>
            )}
            
            <button 
              className="w-full py-3 text-yellow-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 rounded-2xl transition-all mt-4"
              onClick={(e) => { e.stopPropagation(); handleFlip(); }}
            >
              <RotateCcw size={14} /> Voltar ao Card
            </button>
          </div>

          <div className="absolute bottom-6 opacity-20">
            <img src="https://imagens.xadrezbrasilia.com/imagens/logo_xb.png" alt="XB" className="h-8 grayscale brightness-0 invert" />
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
