
import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Calendar,
  Info,
  ChevronDown,
  Instagram,
  Youtube,
  X,
  Menu,
  ChevronRight,
  ChevronLeft,
  Trophy,
  MapPin,
  CalendarDays,
  PlusCircle,
  AlertCircle
} from 'lucide-react';



import { supabase } from './src/services/supabaseClient';
import { Event } from './src/services/eventService';
import { MONTH_NAMES_FULL, LOGO_URL, TODAY_YEAR, TODAY_MONTH, TODAY_DAY } from './src/constants.tsx';

import { TournamentCard } from './TournamentCard.tsx';
import { Timeline } from './Timeline.tsx';
import { CalendarModal } from './CalendarModal.tsx';
import { SocialSection } from './SocialSection.tsx';
import { PartnerSection } from './PartnerSection.tsx';
import { ContactForm } from './ContactForm.tsx';
import { RegisterEventModal } from './RegisterEventModal.tsx';

const App = () => {


  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isGoogleCalendarModalOpen, setIsGoogleCalendarModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch events from Supabase
  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (error) {
          throw error;
        }

        setEvents(data as Event[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const initialIndex = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();

    const index = events.findIndex(event => {
      const [year, month, day] = event.date.split('-').map(Number);
      const eventDate = new Date(year, month - 1, day);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() >= todayMs;
    });

    if (index === -1) return Math.max(0, events.length - 3);
    return index;
  }, [events]);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const filteredEvents = useMemo(() => {
    if (selectedDay === null) return events;
    return events.filter(event => {
      const [year, month, day] = event.date.split('-').map(Number);
      return day === selectedDay && (selectedMonthIndex === null || month - 1 === selectedMonthIndex);
    });
  }, [selectedDay, selectedMonthIndex, events]);

  const displayedEvents = useMemo(() => {
    if (selectedDay !== null) return filteredEvents;
    return events.slice(currentIndex, currentIndex + 3);
  }, [currentIndex, selectedDay, filteredEvents, events]);

  const canGoBack = currentIndex > 0;
  const canGoForward = selectedDay === null && (currentIndex + 3) < events.length;

  const nextMatches = () => {
    if (canGoForward) {
      setCurrentIndex(prev => Math.min(prev + 3, events.length - 1));
    }
  };

  const prevMatches = () => {
    if (canGoBack) {
      setCurrentIndex(prev => Math.max(0, prev - 3));
    }
  };

  const handleDayClick = (day: number, monthIndex: number | null = null) => {
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
    setCurrentIndex(initialIndex);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen selection:bg-yellow-400 selection:text-blue-900">
      <nav className="fixed top-0 left-0 right-0 z-[150] bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4 md:py-5 px-6 md:px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 md:gap-4 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <img src={LOGO_URL} alt="Logo Xadrez Brasília" className="h-full w-full object-contain" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl md:text-2xl font-arial-black text-black leading-none tracking-tighter">XADREZ</span>
            <span className="text-3xl md:text-4xl font-signature text-black leading-none">Brasília</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 font-bold text-gray-500 uppercase text-xs tracking-widest items-center">
          <a href="#match" className="hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1">Encontrar</a>
          <a href="#timeline" className="hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1">Calendário</a>
          <a href="#social" className="hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1">Comunidade</a>
          <a href="#contact" className="hover:text-green-600 transition-colors border-b-2 border-transparent hover:border-yellow-400 pb-1">Suporte</a>
          <button 
            onClick={() => setIsRegisterModalOpen(true)}
            className="bg-blue-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-green-600 transition-all shadow-md group/btn"
          >
            <PlusCircle size={16} className="group-hover/btn:rotate-90 transition-transform" />
            CADASTRAR
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden w-11 h-11 flex items-center justify-center bg-gray-50 rounded-xl text-blue-900 active:scale-95 transition-all"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[140] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-md" onClick={closeMobileMenu} />
        <div className={`absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col p-8 pt-24 gap-8`}>
          <div className="flex flex-col gap-6">
            <a href="#match" onClick={closeMobileMenu} className="text-2xl font-brand text-blue-900 uppercase tracking-tighter flex items-center justify-between group">
              Encontrar <ChevronRight size={20} className="text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#timeline" onClick={closeMobileMenu} className="text-2xl font-brand text-blue-900 uppercase tracking-tighter flex items-center justify-between group">
              Calendário <ChevronRight size={20} className="text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#social" onClick={closeMobileMenu} className="text-2xl font-brand text-blue-900 uppercase tracking-tighter flex items-center justify-between group">
              Comunidade <ChevronRight size={20} className="text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" onClick={closeMobileMenu} className="text-2xl font-brand text-blue-900 uppercase tracking-tighter flex items-center justify-between group">
              Suporte <ChevronRight size={20} className="text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="mt-auto space-y-4">
            <button 
              onClick={() => { closeMobileMenu(); setIsRegisterModalOpen(true); }}
              className="w-full bg-blue-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              <PlusCircle size={20} />
              CADASTRAR EVENTO
            </button>
            <div className="flex justify-center gap-6 py-4">
              <a href="https://www.instagram.com/xadrezbrasiliaeventos/" target="_blank" className="text-gray-400 hover:text-blue-900"><Instagram size={24} /></a>
              <a href="https://www.youtube.com/@XadrezBrasiliaEventos" target="_blank" className="text-gray-400 hover:text-blue-900"><Youtube size={24} /></a>
            </div>
          </div>
        </div>
      </div>

      <section id="match" className="relative pt-32 md:pt-40 pb-24 px-6 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <header className="text-center mb-16 animate-fade-in">
            {selectedDay !== null ? (
              <div className="mb-8 flex flex-col items-center gap-3">
                <span className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-yellow-400/30">
                  <Calendar size={14} /> Filtro Ativo: {selectedDay} de {selectedMonthIndex !== null ? MONTH_NAMES_FULL[selectedMonthIndex] : ''}
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
            
            <h1 className="text-4xl md:text-7xl font-brand text-blue-900 mb-6 leading-[1.1] tracking-tighter">
              {selectedDay !== null 
                ? `Eventos de ${selectedDay} de ${selectedMonthIndex !== null ? MONTH_NAMES_FULL[selectedMonthIndex] : ''}`
                : <>Dê um <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">Checkmate</span> <br />no seu próximo desafio.</>
              }
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
              Explore o ecossistema brasiliense de xadrez: Torneios <strong>Blitz</strong> para agilidade, <strong>Rápidos</strong> para precisão e <strong>Pensados</strong> para mestres.
            </p>
            
            {!selectedDay && (
              <button 
                onClick={() => setIsGoogleCalendarModalOpen(true)}
                className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-green-700 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                <CalendarDays size={18} /> Ver Agenda Completa
              </button>
            )}
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch w-full min-h-[400px]">
            {loading ? (
              <div className="col-span-full text-center py-24 flex flex-col items-center gap-6 animate-fade-in">
                <div className="w-24 h-24 bg-gray-100 rounded-[32px] flex items-center justify-center text-gray-300">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-900 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-brand text-gray-400 uppercase tracking-tighter">Carregando Eventos...</h3>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-24 flex flex-col items-center gap-6 animate-fade-in">
                <div className="w-24 h-24 bg-red-100 rounded-[32px] flex items-center justify-center text-red-500">
                  <AlertCircle size={48} />
                </div>
                <h3 className="text-2xl font-brand text-red-500 uppercase tracking-tighter">Erro ao Carregar Eventos</h3>
                <p className="text-red-400 font-medium">{error}</p>
                <button onClick={() => window.location.reload()} className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-green-600 transition-all">Tentar Novamente</button>
              </div>
            ) : displayedEvents.length > 0 ? (
              displayedEvents.map((event, idx) => (
                <div key={`${event.id}-${idx}`} className="flex justify-center animate-fade-in" style={{animationDelay: `${idx * 150}ms`}}>
                  <TournamentCard event={event} />
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

          {selectedDay === null && events.length > 3 && (
            <div className="mt-16 flex items-center gap-6">
              <button 
                onClick={prevMatches} 
                disabled={!canGoBack}
                className={`p-4 bg-white border border-gray-100 rounded-full shadow-lg transition-all active:scale-95 ${canGoBack ? 'hover:text-green-600 cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="bg-blue-900 text-white px-10 py-4 rounded-[20px] font-black shadow-2xl transition-all flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
                 {currentIndex + 1} - {Math.min(currentIndex + 3, events.length)} / {events.length}
              </div>

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
        selectedDay={selectedDay} 
        selectedMonthIndex={selectedMonthIndex}
        onDayClick={handleDayClick} 
        onOpenCalendar={() => setIsCalendarModalOpen(true)}
      />

      <CalendarModal 
        isOpen={isCalendarModalOpen} 
        onClose={() => setIsCalendarModalOpen(false)} 
        onDayClick={handleDayClick} 
      />

      {/* Modal do Google Calendar */}
      {isGoogleCalendarModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-md" onClick={() => setIsGoogleCalendarModalOpen(false)} />
          <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-bounce-in">
            <header className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3 px-2">
                <CalendarDays className="text-green-600" size={24} />
                <h3 className="text-xl font-brand text-blue-900">Agenda Google - Xadrez Brasília</h3>
              </div>
              <button 
                onClick={() => setIsGoogleCalendarModalOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                <X size={20} />
              </button>
            </header>
            <div className="flex-1 bg-gray-50 p-2 md:p-4">
              <iframe 
                src="https://calendar.google.com/calendar/embed?src=3bfda5669161adb461ff271edf8b4aa99887c3c32bda1231dff2cba925af1258%40group.calendar.google.com&ctz=America%2FSao_Paulo" 
                style={{ border: 0 }} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no"
                className="rounded-3xl shadow-inner bg-white"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cadastro de Evento */}
      <RegisterEventModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />

      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Card Rating Oficial */}
          <div className="group bg-gray-50 p-8 rounded-[40px] shadow-sm border-l-8 border-green-600 hover:bg-white hover:shadow-2xl transition-all duration-500 flex items-start gap-6">
            <div className="flex-shrink-0 w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Trophy size={44} />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-brand text-blue-900 mb-2 tracking-tight uppercase">Rating Oficial</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">Aumente sua pontuação nos rankings FIDE e CBX participando de competições homologadas.</p>
            </div>
          </div>

          {/* Card Locais Privilegiados */}
          <div className="group bg-gray-50 p-8 rounded-[40px] shadow-sm border-l-8 border-yellow-400 hover:bg-white hover:shadow-2xl transition-all duration-500 flex items-start gap-6">
            <div className="flex-shrink-0 w-20 h-20 bg-yellow-100 rounded-3xl flex items-center justify-center text-yellow-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <MapPin size={44} />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-brand text-blue-900 mb-2 tracking-tight uppercase">Locais Privilegiados</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">Eventos realizados nos melhores clubes, hotéis e centros de convenções de Brasília e região.</p>
            </div>
          </div>

          {/* Card Total Transparência */}
          <div className="group bg-gray-50 p-8 rounded-[40px] shadow-sm border-l-8 border-blue-900 hover:bg-white hover:shadow-2xl transition-all duration-500 flex items-start gap-6">
            <div className="flex-shrink-0 w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-900 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Info size={44} />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-brand text-blue-900 mb-2 tracking-tight uppercase">Total Transparência</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">Acesso facilitado a regulamentos, cronogramas detalhados e link para formulários de inscrição.</p>
            </div>
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
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-arial-black text-black leading-none tracking-tighter">XADREZ</span>
                <span className="text-5xl font-signature text-black leading-none">Brasília</span>
              </div>
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
        .force-gpu-clip {
          mask-image: -webkit-radial-gradient(white, black);
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      .text-shadow-lg {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
      }
      .text-shadow-md {
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
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
