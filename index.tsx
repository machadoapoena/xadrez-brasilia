
import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Calendar, 
  Info,
  ChevronDown,
  Instagram,
  Youtube,
  X,
  ChevronRight,
  ChevronLeft,
  Trophy,
  MapPin
} from 'lucide-react';

import {
  TODAY_DAY,
  TODAY_MONTH,
  MONTH_NAMES_FULL,
  LOGO_URL,
  TOURNAMENTS
} from './constants.tsx';

import { TournamentCard } from './TournamentCard.tsx';
import { Timeline } from './Timeline.tsx';
import { CalendarModal } from './CalendarModal.tsx';
import { SocialSection } from './SocialSection.tsx';
import { PartnerSection } from './PartnerSection.tsx';
import { ContactForm } from './ContactForm.tsx';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const filteredTournaments = useMemo(() => {
    if (selectedDay === null) return TOURNAMENTS;
    return TOURNAMENTS.filter(t => t.day === selectedDay && (selectedMonthIndex === null || t.monthIndex === selectedMonthIndex));
  }, [selectedDay, selectedMonthIndex]);

  const displayedTournaments = useMemo(() => {
    if (selectedDay !== null) return filteredTournaments;
    // Agora usamos slice simples para garantir que pare no último item
    return TOURNAMENTS.slice(currentIndex, currentIndex + 3);
  }, [currentIndex, selectedDay, filteredTournaments]);

  const canGoBack = currentIndex > 0;
  const canGoForward = selectedDay === null && (currentIndex + 3) < TOURNAMENTS.length;

  const nextMatches = () => {
    if (canGoForward) {
      setCurrentIndex(prev => prev + 3);
    }
  };

  const prevMatches = () => {
    if (canGoBack) {
      setCurrentIndex(prev => Math.max(0, prev - 3));
    }
  };

  const handleDayClick = (day: number, monthIndex: number = TODAY_MONTH) => {
    setSelectedDay(day);
    setSelectedMonthIndex(monthIndex);
    setIsCalendarModalOpen(false);
    const matchSection = document.getElementById('match');
    if (matchSection) {
      matchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clearFilter = () => {
    setSelectedDay(null);
    setSelectedMonthIndex(null);
    setCurrentIndex(0); // Volta para o início ao limpar filtro
  };

  return (
    <div className="min-h-screen selection:bg-yellow-400 selection:text-blue-900">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-gray-100 py-5 px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="h-12 w-12 overflow-hidden flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <img src={LOGO_URL} alt="Logo Xadrez Brasília" className="h-full w-full object-contain" />
          </div>
          <span className="text-4xl font-signature text-black leading-none">Xadrez Brasília</span>
        </div>
        <div className="hidden lg:flex gap-10 font-bold text-gray-500 uppercase text-xs tracking-widest">
          <a href="#match" className="hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1">Encontrar</a>
          <a href="#timeline" className="hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1">Calendário</a>
          <a href="#social" className="hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1">Comunidade</a>
          <a href="#contact" className="hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1">Suporte</a>
        </div>
        <div className="w-12 h-12 flex items-center justify-center lg:hidden">
          <ChevronDown size={24} className="text-blue-900" />
        </div>
      </nav>

      <section id="match" className="relative pt-40 pb-24 px-6 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <header className="text-center mb-16 animate-fade-in">
            {selectedDay !== null ? (
              <div className="mb-8 flex flex-col items-center gap-3">
                <span className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-yellow-400/30">
                  <Calendar size={14} /> Filtro Ativo: {selectedDay} de {MONTH_NAMES_FULL[selectedMonthIndex ?? TODAY_MONTH]}
                </span>
                <button 
                  onClick={clearFilter}
                  className="text-red-500 hover:text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <X size={12} className="stroke-[3px]" /> LIMPAR FILTRO
                </button>
              </div>
            ) : (
              <div className="mb-4 text-green-600 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
                Plataforma Oficial de Torneios
              </div>
            )}
            
            <h1 className="text-5xl md:text-7xl font-brand text-blue-900 mb-6 leading-[1.1] tracking-tighter">
              {selectedDay !== null 
                ? `Eventos de ${selectedDay} de ${MONTH_NAMES_FULL[selectedMonthIndex ?? TODAY_MONTH]}`
                : <>Dê um <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">Checkmate</span> <br />no seu próximo desafio.</>
              }
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore o ecossistema brasiliense de xadrez: Torneios <strong>Blitz</strong> para agilidade, <strong>Rápidos</strong> para precisão e <strong>Pensados</strong> para mestres.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch w-full min-h-[400px]">
            {displayedTournaments.length > 0 ? (
              displayedTournaments.map((t, idx) => (
                <div key={`${t.id}-${idx}`} className="flex justify-center animate-fade-in" style={{animationDelay: `${idx * 150}ms`}}>
                  <TournamentCard tournament={t} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 flex flex-col items-center gap-6 animate-fade-in">
                <div className="w-24 h-24 bg-gray-100 rounded-[32px] flex items-center justify-center text-gray-300">
                  <Calendar size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-brand text-gray-400 uppercase tracking-tighter">Sem Eventos Programados</h3>
                  <p className="text-gray-400 font-medium">Não encontramos torneios oficiais para esta data específica.</p>
                </div>
                <button onClick={clearFilter} className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-green-600 transition-all">Ver todos os eventos</button>
              </div>
            )}
          </div>

          {selectedDay === null && TOURNAMENTS.length > 3 && (
            <div className="mt-16 flex items-center gap-6">
              <button 
                onClick={prevMatches} 
                disabled={!canGoBack}
                className={`p-4 bg-white border border-gray-100 rounded-full shadow-lg transition-all active:scale-95 ${canGoBack ? 'hover:text-green-600 cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={nextMatches}
                disabled={!canGoForward}
                className={`bg-blue-900 text-white px-10 py-4 rounded-[20px] font-black shadow-2xl transition-all transform flex items-center gap-4 text-xs uppercase tracking-[0.2em] ${canGoForward ? 'hover:shadow-blue-900/40 hover:translate-y-[-2px] active:scale-95 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              >
                {canGoForward ? 'MAIS TORNEIOS' : 'FIM DA LISTA'} <ChevronRight size={16} />
              </button>

              <button 
                onClick={nextMatches} 
                disabled={!canGoForward}
                className={`p-4 bg-white border border-gray-100 rounded-full shadow-lg transition-all active:scale-95 ${canGoForward ? 'hover:text-green-600 cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          <div className="mt-16 flex flex-col items-center gap-4 text-gray-300">
            <div className="flex items-center gap-2 animate-bounce">
              <ChevronDown size={24} className="text-yellow-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Role para o Calendário Completo</span>
          </div>
        </div>
      </section>

      <Timeline 
        selectedDay={selectedDay && selectedMonthIndex === TODAY_MONTH ? selectedDay : null} 
        onDayClick={(day) => handleDayClick(day, TODAY_MONTH)} 
        onOpenCalendar={() => setIsCalendarModalOpen(true)}
      />

      <CalendarModal 
        isOpen={isCalendarModalOpen} 
        onClose={() => setIsCalendarModalOpen(false)} 
        onDayClick={handleDayClick} 
      />

      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="group bg-gray-50 p-10 rounded-[40px] shadow-sm border-t-8 border-green-600 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform">
              <Trophy size={36} />
            </div>
            <h3 className="text-2xl font-brand text-blue-900 mb-5 tracking-tight uppercase">Rating Oficial</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Aumente sua pontuação nos rankings FIDE e CBX participando de competições homologadas.</p>
          </div>
          <div className="group bg-gray-50 p-10 rounded-[40px] shadow-sm border-t-8 border-yellow-400 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-yellow-100 rounded-3xl flex items-center justify-center text-yellow-600 mb-8 group-hover:scale-110 transition-transform">
              <MapPin size={36} />
            </div>
            <h3 className="text-2xl font-brand text-blue-900 mb-5 tracking-tight uppercase">Locais Privilegiados</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Eventos realizados nos melhores clubes, hotéis e centros de convenções de Brasília e região.</p>
          </div>
          <div className="group bg-gray-50 p-10 rounded-[40px] shadow-sm border-t-8 border-blue-900 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-900 mb-8 group-hover:scale-110 transition-transform">
              <Info size={36} />
            </div>
            <h3 className="text-2xl font-brand text-blue-900 mb-5 tracking-tight uppercase">Total Transparência</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Acesso facilitado a regulamentos, cronogramas detalhados e link para formulários de inscrição.</p>
          </div>
        </div>
      </section>

      <SocialSection />
      
      <PartnerSection />

      <ContactForm />

      <footer className="bg-white py-20 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-16">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 overflow-hidden">
                <img src={LOGO_URL} alt="Logo Xadrez Brasília" className="w-full h-full object-contain" />
              </div>
              <span className="text-5xl font-signature text-black leading-none">Xadrez Brasília</span>
            </div>
            <div className="flex flex-wrap justify-center gap-10 font-bold text-gray-400 text-sm tracking-widest uppercase">
              <a href="#match" className="hover:text-blue-900 transition-colors">Torneios</a>
              <a href="#timeline" className="hover:text-blue-900 transition-colors">Calendário</a>
              <a href="#social" className="hover:text-blue-900 transition-colors">Redes Sociais</a>
              <a href="#contact" className="hover:text-blue-900 transition-colors">Fale Conosco</a>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/xadrezbrasiliaeventos/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-blue-900 transition-all cursor-pointer shadow-sm"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@XadrezBrasiliaEventos" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-blue-900 transition-all cursor-pointer shadow-sm"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">© 2025 XADREZ BRASÍLIA EVENTOS. DESENVOLVIDO PARA A COMUNIDADE ENXADRISTA DO DF.</p>
             <div className="flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <a href="#" className="hover:text-blue-900">Termos</a>
                <a href="#" className="hover:text-blue-900">Privacidade</a>
             </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Correção para Bug de Overflow em Bordas Arredondadas com Transformação */
        .force-gpu-clip {
          mask-image: -webkit-radial-gradient(white, black);
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
