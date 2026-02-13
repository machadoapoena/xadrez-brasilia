
import React from 'react';
import { CalendarDays } from 'lucide-react';
import { TODAY_YEAR, TODAY_MONTH, TODAY_DAY, MONTH_NAMES_SHORT, TOURNAMENTS } from './constants.tsx';
import { getDaysInMonth } from './utils.tsx';

interface TimelineProps {
  selectedDay: number | null;
  onDayClick: (day: number) => void;
  onOpenCalendar: () => void;
}

export const Timeline = ({ 
  selectedDay, 
  onDayClick,
  onOpenCalendar
}: TimelineProps) => {
  const daysInMonth = getDaysInMonth(TODAY_YEAR, TODAY_MONTH);
  const remainingDays = Array.from({ length: daysInMonth - TODAY_DAY + 1 }, (_, i) => TODAY_DAY + i);

  return (
    <section id="timeline" className="py-24 px-6 bg-white relative border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col items-center text-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-brand text-blue-900 mb-2">Calendário de Eventos</h2>
            <p className="text-gray-500 font-medium italic">Navegação rápida a partir de hoje ({TODAY_DAY}/{TODAY_MONTH + 1}).</p>
          </div>
          <button 
            onClick={onOpenCalendar}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all hover:scale-[1.05]"
          >
            <CalendarDays size={18} /> PRÓXIMOS EVENTOS
          </button>
        </header>
        
        <div className="relative pt-4 pb-12 overflow-x-auto hide-scrollbar scroll-smooth">
          <div className="flex gap-4 min-w-max px-8">
            {remainingDays.map((dayNum) => {
              const events = TOURNAMENTS.filter(t => t.day === dayNum && t.monthIndex === TODAY_MONTH);
              const isToday = dayNum === TODAY_DAY;
              const hasEvents = events.length > 0;
              const isSelected = selectedDay === dayNum;

              return (
                <button 
                  key={dayNum} 
                  disabled={!hasEvents && !isToday}
                  className={`
                    group relative flex flex-col items-center outline-none focus:ring-2 focus:ring-yellow-400 rounded-2xl transition-all duration-300
                    ${!hasEvents && !isToday ? 'opacity-40 cursor-default' : 'cursor-pointer hover:translate-y-[-4px]'}
                  `}
                  onClick={() => hasEvents && onDayClick(dayNum)}
                >
                  <div className={`
                    w-16 h-24 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-500
                    ${isSelected ? 'bg-yellow-400 border-yellow-500 shadow-[0_15px_30px_rgba(254,221,0,0.4)] scale-110' : 
                      isToday ? 'bg-blue-900 border-blue-900 shadow-xl text-white' : 
                      hasEvents ? 'bg-white border-green-600 shadow-sm text-blue-900 hover:border-yellow-400' : 
                      'bg-gray-50 border-gray-100 text-gray-400'}
                  `}>
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${isSelected ? 'text-blue-900' : 'opacity-60'}`}>
                      {MONTH_NAMES_SHORT[TODAY_MONTH]}
                    </span>
                    <span className={`text-3xl font-brand font-black ${isSelected ? 'text-blue-900' : isToday ? 'text-yellow-400' : hasEvents ? 'text-green-700' : 'text-gray-400'}`}>
                      {dayNum}
                    </span>
                    {hasEvents && !isSelected && (
                      <div className="mt-2 flex gap-1">
                        {events.slice(0, 3).map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="h-6 mt-2">
                    {isSelected ? (
                       <div className="text-[9px] font-black text-blue-900 uppercase tracking-widest bg-yellow-200 px-2 rounded-full">
                        Ativo
                      </div>
                    ) : hasEvents ? (
                      <div className="text-[9px] font-black text-green-700 uppercase tracking-widest">
                        {events.length > 1 ? `${events.length} Eventos` : 'Evento'}
                      </div>
                    ) : isToday ? (
                      <div className="text-[9px] font-black text-blue-900 uppercase tracking-widest">
                        Hoje
                      </div>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
