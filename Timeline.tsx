import { useMemo } from 'react';
import { TODAY_YEAR, TODAY_MONTH, TODAY_DAY, MONTH_NAMES_SHORT, TOURNAMENTS } from './constants.tsx';

interface TimelineProps {
  selectedDay: number | null;
  selectedMonthIndex: number | null;
  onDayClick: (day: number, monthIndex: number) => void;
}

export const Timeline = ({ 
  selectedDay, 
  selectedMonthIndex,
  onDayClick,
}: TimelineProps) => {
  const timelineDates = useMemo(() => {
    return Array.from({ length: 13 }, (_, i) => {
      const date = new Date(TODAY_YEAR, TODAY_MONTH, TODAY_DAY);
      date.setDate(TODAY_DAY + i);
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      };
    });
  }, []);

  return (
    <section id="timeline" className="py-24 px-6 bg-white relative border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col items-center text-center gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-brand text-blue-900">Calendário de Eventos</h2>
          <p className="text-gray-500 font-medium italic">Navegação rápida para os próximos 12 dias.</p>
        </header>
        
        <div className="relative pt-4 pb-12 overflow-x-auto hide-scrollbar scroll-smooth">
          <div className="flex gap-4 min-w-max px-8 md:justify-center">
            {timelineDates.map(({ day, month, year }) => {
              const events = TOURNAMENTS.filter(t => t.day === day && t.monthIndex === month && t.year === year);
              const isToday = day === TODAY_DAY && month === TODAY_MONTH && year === TODAY_YEAR;
              const hasEvents = events.length > 0;
              const isSelected = selectedDay === day && selectedMonthIndex === month;

              return (
                <button 
                  key={`${day}-${month}-${year}`} 
                  disabled={!hasEvents && !isToday}
                  className={`
                    group relative flex flex-col items-center outline-none rounded-2xl transition-all duration-300
                    ${!hasEvents && !isToday ? 'opacity-40 cursor-default' : 'cursor-pointer hover:translate-y-[-4px]'}
                  `}
                  onClick={() => hasEvents && onDayClick(day, month)}
                >
                  <div className={`
                    w-16 h-24 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-500
                    ${isSelected ? 'bg-yellow-400 border-yellow-500 shadow-xl scale-110' : 
                      isToday ? 'bg-blue-900 border-blue-900 shadow-xl text-white' : 
                      hasEvents ? 'bg-white border-green-600 shadow-sm text-blue-900' : 
                      'bg-gray-50 border-gray-100 text-gray-400'}
                  `}>
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${isSelected ? 'text-blue-900' : 'opacity-60'}`}>
                      {MONTH_NAMES_SHORT[month]}
                    </span>
                    <span className={`text-3xl font-brand font-black ${isSelected ? 'text-blue-900' : isToday ? 'text-yellow-400' : hasEvents ? 'text-green-700' : 'text-gray-400'}`}>
                      {day}
                    </span>
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
