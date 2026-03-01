
import React from 'react';
import { CalendarDays, X } from 'lucide-react';
import { TODAY_YEAR, TODAY_MONTH, TODAY_DAY, MONTH_NAMES_FULL, TOURNAMENTS } from './constants.tsx';
import { Event } from './types';
import { getDaysInMonth, getFirstDayOfMonth } from './utils.tsx';

const MonthlyCalendar = ({ 
  year, 
  month, 
  monthName, 
  onDayClick 
}: { 
  year: number; 
  month: number; 
  monthName: string; 
  onDayClick: (day: number, monthIndex: number) => void 
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);
  const isCurrentMonth = TODAY_YEAR === year && TODAY_MONTH === month;

  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex-1">
      <h4 className="text-xl font-brand text-blue-900 mb-6 text-center uppercase tracking-widest">{monthName} {year}</h4>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
          <div key={d} className="text-center text-[10px] font-black text-gray-300 py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map(i => <div key={`empty-${i}`} />)}
        {days.map(day => {
          const events = TOURNAMENTS.filter(t => t.day === day && t.monthIndex === month);
          const hasEvents = events.length > 0;
          const isToday = isCurrentMonth && TODAY_DAY === day;

          return (
            <button
              key={day}
              onClick={() => hasEvents && onDayClick(day, month)}
              disabled={!hasEvents}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center transition-all relative
                ${hasEvents ? 'hover:bg-yellow-400 hover:text-blue-900 cursor-pointer' : 'opacity-20 cursor-default'}
                ${isToday ? 'bg-blue-900 text-white font-bold ring-2 ring-blue-900 ring-offset-2' : ''}
                ${hasEvents && !isToday ? 'bg-green-50 text-green-700 font-bold border border-green-200' : ''}
              `}
            >
              <span className="text-sm">{day}</span>
              {hasEvents && !isToday && (
                <div className="absolute bottom-1 w-1 h-1 bg-yellow-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDayClick: (day: number, monthIndex: number) => void;
}

export const CalendarModal = ({ 
  isOpen, 
  onClose, 
  onDayClick 
}: CalendarModalProps) => {
  if (!isOpen) return null;

  const nextMonth = (TODAY_MONTH + 1) % 12;
  const nextYear = nextMonth === 0 ? TODAY_YEAR + 1 : TODAY_YEAR;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-gray-50 w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-bounce-in">
        <header className="p-8 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-green-600" size={28} />
            <h3 className="text-2xl font-brand text-blue-900">Agenda Completa</h3>
          </div>

          <button onClick={onClose} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-all">
            <X size={24} />
          </button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MonthlyCalendar year={TODAY_YEAR} month={TODAY_MONTH} monthName={MONTH_NAMES_FULL[TODAY_MONTH]} onDayClick={onDayClick} />
            <MonthlyCalendar year={nextYear} month={nextMonth} monthName={MONTH_NAMES_FULL[nextMonth]} onDayClick={onDayClick} />
          </div>
          <div className="mt-8 bg-blue-900/5 p-6 rounded-3xl border border-blue-900/10">
            <h5 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-widest">Legenda:</h5>
            <div className="flex flex-wrap gap-6 text-xs font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-900 rounded-full" /> Hoje
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-50 border border-green-200 rounded-sm" /> Dia com Eventos
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" /> Filtro Ativo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
