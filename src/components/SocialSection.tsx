
import React from 'react';
import { Instagram, Youtube, ChevronRight, Download } from 'lucide-react';

export const SocialSection = () => {
  return (
    <section id="social" className="py-24 bg-gray-100 px-6 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-brand text-blue-900 mb-4 tracking-tight relative inline-block">
            Comunidade Xadrez Brasília
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full" />
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Acompanhe bastidores e resultados através dos nossos canais oficiais.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Instagram Card */}
          <a 
            href="https://www.instagram.com/xadrezbrasiliaeventos/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-8 rounded-[44px] bg-white text-blue-900 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col h-full min-h-[240px] border border-gray-100"
          >
            <div className="flex items-start gap-6 mb-auto relative z-10">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform duration-500">
                <Instagram size={28} className="text-blue-900" />
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-black mb-1 tracking-tight">Instagram</h3>
                <p className="text-gray-500 font-bold text-[10px] leading-tight max-w-[140px]">Fotos exclusivas e stories dos eventos.</p>
              </div>
            </div>
            <div className="mt-6 font-black text-[10px] uppercase tracking-wider flex items-center justify-between bg-gray-50 px-5 py-4 rounded-full w-full border border-gray-100 group-hover:bg-blue-50 transition-all relative z-10">
              <span className="text-blue-900">@xadrezbrasiliaeventos</span>
              <ChevronRight size={16} className="text-blue-900" />
            </div>
          </a>
          
          {/* YouTube Card */}
          <a 
            href="https://www.youtube.com/@XadrezBrasiliaEventos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-8 rounded-[44px] bg-white text-blue-900 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col h-full min-h-[240px] border border-gray-100"
          >
            <div className="flex items-start gap-6 mb-auto relative z-10">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:-rotate-6 transition-transform duration-500">
                <Youtube size={28} className="text-blue-900" />
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-black mb-1 tracking-tight">YouTube</h3>
                <p className="text-gray-500 font-bold text-[10px] leading-tight max-w-[140px]">Transmissões ao vivo e tutoriais.</p>
              </div>
            </div>
            <div className="mt-6 font-black text-[10px] uppercase tracking-wider flex items-center justify-between bg-gray-50 px-5 py-4 rounded-full w-full border border-gray-100 group-hover:bg-blue-50 transition-all relative z-10">
              <span className="text-blue-900">Canal Xadrez Brasília</span>
              <ChevronRight size={16} className="text-blue-900" />
            </div>
          </a>

          {/* App Android Card */}
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-8 rounded-[44px] bg-white text-blue-900 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col h-full min-h-[240px] border border-gray-100"
          >
            <div className="flex items-start gap-6 mb-auto relative z-10">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform duration-500">
                <Download size={28} className="text-blue-900" />
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-black mb-1 tracking-tight">App Android</h3>
                <p className="text-gray-500 font-bold text-[10px] leading-tight max-w-[140px]">Baixe nosso aplicativo para Android.</p>
              </div>
            </div>
            <div className="mt-6 font-black text-[10px] uppercase tracking-wider flex items-center justify-between bg-gray-50 px-5 py-4 rounded-full w-full border border-gray-100 group-hover:bg-blue-50 transition-all relative z-10">
              <span className="text-blue-900">Download APK</span>
              <ChevronRight size={16} className="text-blue-900" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
