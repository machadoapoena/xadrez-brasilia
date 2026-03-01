
import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { Partner } from './types';

// Explicitly typed as React.FC to ensure that the 'key' prop is recognized by TypeScript when the component is used in a map.
export const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://wa.me/${partner.contact}?text=Olá! Encontrei seu contato no site Xadrez Brasília e gostaria de informações sobre aulas de xadrez.`;
    window.open(url, '_blank');
  };

  const handleInstagram = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Usa o instagram do parceiro se existir, senão usa o padrão do site
    const url = partner.instagram || 'https://www.instagram.com/xadrezbrasiliaeventos/';
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[280px] p-4 text-center group">
      {/* Avatar Circular - Ajustado para visibilidade total (object-contain + padding) */}
      <div className="w-44 h-44 rounded-full overflow-hidden mb-6 shadow-lg border-4 border-gray-100 bg-white transition-transform duration-500 group-hover:scale-105 flex items-center justify-center p-6">
        <img 
          src={partner.image} 
          alt={partner.name} 
          className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
          loading="lazy"
        />
      </div>

      {/* Rótulo / Cargo */}
      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1">
        {partner.role}
      </span>

      {/* Nome */}
      <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
        {partner.name}
      </h3>

      {/* Descrição */}
      <p className="text-gray-500 text-xs leading-relaxed mb-6 px-2 line-clamp-3">
        {partner.description}
      </p>

      {/* Ícones Sociais (Apenas Instagram e WhatsApp) */}
      <div className="flex items-center gap-4">
        <div 
          onClick={handleInstagram}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#E1306C] hover:text-white transition-all cursor-pointer shadow-sm"
          title="Instagram"
        >
          <Instagram size={18} />
        </div>
        <div 
          onClick={handleWhatsApp}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all cursor-pointer shadow-sm"
          title="WhatsApp"
        >
          <MessageCircle size={18} />
        </div>
      </div>
    </div>
  );
};
