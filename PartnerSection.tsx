
import React, { useMemo } from 'react';
import { PARTNERS } from './constants.tsx';
import { PartnerCard } from './PartnerCard.tsx';

export const PartnerSection = () => {
  const randomPartners = useMemo(() => {
    const list = Array.isArray(PARTNERS) ? [...PARTNERS] : [];
    if (list.length === 0) return [];
    
    // Seleciona 3 parceiros aleatoriamente para justificar a mensagem de lista rotativa
    return list
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, []);

  return (
    <section className="py-24 bg-white px-6 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <div className="mb-4 text-green-600 font-black uppercase tracking-[0.3em] text-[10px]">
            Equipe & Mentores
          </div>
          <h2 className="text-4xl md:text-5xl font-brand text-blue-900 mb-6 tracking-tight">
            Escolas & Professores
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Conheça os profissionais dedicados a difundir a cultura enxadrista em Brasília.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-12 lg:gap-20 items-start min-h-[300px]">
          {randomPartners.length > 0 ? (
            randomPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))
          ) : (
            <div className="text-gray-400 font-medium italic">
              Nenhum parceiro encontrado.
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Lista rotativa • Atualize a página para ver outros instrutores
          </p>
          <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full opacity-30"></div>
        </div>
      </div>
    </section>
  );
};
