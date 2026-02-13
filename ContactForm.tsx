
import React, { useState } from 'react';
import { MessageCircle, User, Mail } from 'lucide-react';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "5561999999999"; 
    const fullMessage = `Olá! Meu nome é ${name} (${email}).\n\nDúvida sobre Torneios: ${message}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600 rounded-full blur-[150px] opacity-10 -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400 rounded-full blur-[120px] opacity-10 -ml-48 -mb-48" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-brand mb-6">Ficou com alguma dúvida, ou têm sugestões para melhorias?</h2>
        <p className="text-blue-200 mb-14 text-xl font-light">Entre em contato e tentaremos atender da melhor forma possível.</p>
        
        <form onSubmit={sendWhatsApp} className="max-w-2xl mx-auto bg-white/5 backdrop-blur-2xl p-10 rounded-[40px] border border-white/10 flex flex-col gap-6 text-left shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-blue-300 ml-2">Nome Completo</label>
              <div className="relative">
                <User size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                <input required type="text" placeholder="Como deseja ser chamado?" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:ring-2 focus:ring-yellow-400 focus:bg-white/10 transition-all outline-none" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-blue-300 ml-2">E-mail para Contato</label>
              <div className="relative">
                <Mail size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                <input required type="email" placeholder="seu@email.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:ring-2 focus:ring-yellow-400 focus:bg-white/10 transition-all outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-blue-300 ml-2">Sua Mensagem</label>
            <textarea required placeholder="Como podemos ajudar você hoje?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:ring-2 focus:ring-yellow-400 focus:bg-white/10 h-40 resize-none transition-all outline-none" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] shadow-xl group">
            <MessageCircle className="group-hover:rotate-12 transition-transform" /> ENVIAR VIA WHATSAPP
          </button>
        </form>
      </div>
    </section>
  );
};
