
import React from 'react';
import { MessageCircle, GraduationCap } from 'lucide-react';
import { Partner } from './constants.tsx';

export const PartnerCard = ({ partner }: { partner: Partner }) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://wa.me/${partner.contact}?text=Olá! Encontrei seu contato no site Xadrez Brasília e gostaria de informações sobre aulas de xadrez.`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-[240px] h-[320px] relative group rounded-[28px] overflow-hidden shadow-lg bg-white border border-gray-100 transition-all hover:translate-y-[-6px] hover:shadow-2xl">
      {/* Imagem de Fundo */}
      <div className="absolute inset-0 bg-gray-200">
        <img 
          src={partner.image} 
          alt={partner.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          loading="lazy"
        />
      </div>
      
      {/* Overlay de Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/50 to-transparent opacity-95" />
      
      {/* Ícone de Categoria */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-yellow-400 p-2 rounded-xl shadow-lg border border-white/20">
          <GraduationCap className="text-blue-900" size={16} />
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="text-lg font-brand text-white mb-1.5 leading-tight uppercase tracking-tighter group-hover:text-yellow-400 transition-colors">
          {partner.name}
        </h3>
        <p className="text-blue-100 text-[10px] font-medium mb-4 line-clamp-2 opacity-90">
          {partner.description}
        </p>
        
        <button 
          onClick={handleWhatsApp}
          className="w-full py-2.5 bg-yellow-400 text-blue-900 font-black rounded-xl text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-black/20"
        >
          <MessageCircle size={12} /> WhatsApp
        </button>
      </div>
    </div>
  );
};
