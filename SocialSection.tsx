
import React from 'react';
import { Instagram, Youtube, ChevronRight } from 'lucide-react';

export const SocialSection = () => {
  return (
    <section id="social" className="py-24 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-brand text-blue-900 mb-4 tracking-tight">Comunidade Xadrez Brasília</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Acompanhe bastidores e resultados através dos nossos canais oficiais.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <a 
            href="https://www.instagram.com/xadrezbrasiliaeventos/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-8 p-10 rounded-[40px] bg-gradient-to-br from-yellow-400 to-green-600 text-blue-900 shadow-2xl hover:scale-[1.03] transition-all duration-500"
          >
            <div className="w-20 h-20 bg-blue-900/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
              <Instagram size={48} className="text-blue-900" />
            </div>
            <div>
              <h3 className="text-3xl font-black mb-2">Instagram</h3>
              <p className="text-blue-900/70 font-medium">Fotos exclusivas e stories dos eventos.</p>
              <div className="mt-6 font-black flex items-center gap-3 bg-blue-900/10 px-4 py-2 rounded-full w-fit">
                @xadrezbrasiliaeventos <ChevronRight size={18} />
              </div>
            </div>
          </a>
          
          <a 
            href="https://www.youtube.com/@XadrezBrasiliaEventos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-8 p-10 rounded-[40px] bg-gradient-to-br from-green-600 to-yellow-400 text-white shadow-2xl hover:scale-[1.03] transition-all duration-500"
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-inner group-hover:-rotate-6 transition-transform">
              <Youtube size={48} className="text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-black mb-2">YouTube</h3>
              <p className="opacity-80 font-medium">Transmissões ao vivo e tutoriais.</p>
              <div className="mt-6 font-black flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full w-fit">
                Canal Xadrez Brasília <ChevronRight size={18} />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
