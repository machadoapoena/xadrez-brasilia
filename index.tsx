import { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Calendar, 
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

import {
  TODAY_MONTH,
  MONTH_NAMES_FULL,
  LOGO_URL,
  TOURNAMENTS
} from './constants.tsx';

import { TournamentCard } from './TournamentCard.tsx';
import { Timeline } from './Timeline.tsx';

const App = () => {
  const initialIndex = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();

    const index = TOURNAMENTS.findIndex(t => {
      const eventDate = new Date(t.year, t.monthIndex, t.day);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() >= todayMs;
    });

    if (index === -1) return Math.max(0, TOURNAMENTS.length - 3);
    return index;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);

  const filteredTournaments = useMemo(() => {
    if (selectedDay === null) return TOURNAMENTS;
    return TOURNAMENTS.filter(t => t.day === selectedDay && (selectedMonthIndex === null || t.monthIndex === selectedMonthIndex));
  }, [selectedDay, selectedMonthIndex]);

  const displayedTournaments = useMemo(() => {
    if (selectedDay !== null) return filteredTournaments;
    return TOURNAMENTS.slice(currentIndex, currentIndex + 3);
  }, [currentIndex, selectedDay, filteredTournaments]);

  const canGoBack = currentIndex > 0;
  const canGoForward = selectedDay === null && (currentIndex + 3) < TOURNAMENTS.length;

  const nextMatches = () => {
    if (canGoForward) {
      setCurrentIndex(prev => Math.min(prev + 3, TOURNAMENTS.length - 1));
    }
  };

  const prevMatches = () => {
    if (canGoBack) {
      setCurrentIndex(prev => Math.max(0, prev - 3));
    }
  };

  const handleDayClick = (day: number, monthIndex: number) => {
    setSelectedDay(day);
    setSelectedMonthIndex(monthIndex);
    const matchSection = document.getElementById('match');
    if (matchSection) {
      matchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clearFilter = () => {
    setSelectedDay(null);
    setSelectedMonthIndex(null);
    setCurrentIndex(initialIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <img src={LOGO_URL} alt="Logo" className="h-10 w-10 object-contain" />
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black tracking-tighter">XADREZ</span>
            <span className="text-3xl font-signature">Brasília</span>
          </div>
        </div>
      </nav>

      <section id="match" className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <header className="text-center mb-16">
            {selectedDay !== null && (
              <div className="mb-8 flex flex-col items-center gap-3">
                <span className="bg-yellow-400 text-black px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} /> Filtro: {selectedDay} de {MONTH_NAMES_FULL[selectedMonthIndex ?? TODAY_MONTH]}
                </span>
                <button onClick={clearFilter} className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <X size={12} /> LIMPAR FILTRO
                </button>
              </div>
            )}
            
            <h1 className="text-4xl md:text-7xl font-brand text-blue-900 mb-6 leading-none tracking-tighter">
              {selectedDay !== null 
                ? `Eventos de ${selectedDay} de ${MONTH_NAMES_FULL[selectedMonthIndex ?? TODAY_MONTH]}`
                : <>Dê um <span className="text-green-600">Checkmate</span> no seu próximo desafio.</>
              }
            </h1>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {displayedTournaments.map((t, idx) => (
              <TournamentCard key={`${t.id}-${idx}`} tournament={t} />
            ))}
            {displayedTournaments.length === 0 && (
              <div className="col-span-full text-center py-24 text-gray-400 font-bold uppercase">
                Sem eventos para esta data.
              </div>
            )}
          </div>

          {selectedDay === null && TOURNAMENTS.length > 3 && (
            <div className="mt-16 flex items-center gap-6">
              <button onClick={prevMatches} disabled={!canGoBack} className="p-4 bg-white rounded-full shadow-lg disabled:opacity-30">
                <ChevronLeft size={24} />
              </button>
              <div className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-black text-xs">
                 {currentIndex + 1} - {Math.min(currentIndex + 3, TOURNAMENTS.length)} / {TOURNAMENTS.length}
              </div>
              <button onClick={nextMatches} disabled={!canGoForward} className="p-4 bg-white rounded-full shadow-lg disabled:opacity-30">
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </section>

      <Timeline 
        selectedDay={selectedDay} 
        selectedMonthIndex={selectedMonthIndex}
        onDayClick={handleDayClick} 
      />

      <footer className="bg-white py-20 px-8 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">© 2025 XADREZ BRASÍLIA EVENTOS</p>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
