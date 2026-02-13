
import React from 'react';
import { Trophy, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Tournament } from './constants.tsx';
import { getBadgeStyles } from './utils.tsx';

export const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  return (
    <div className="relative group w-full max-w-[320px] h-[400px] rounded-[32px] overflow-hidden shadow-2xl bg-white border-4 border-yellow-400 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-yellow-400/20 isolate transform-gpu force-gpu-clip">
      <img src={tournament.image} alt={tournament.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 backface-hidden" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/40 to-transparent" />
      
      <div className="absolute top-4 left-4 flex flex-col items-center">
        <div className="bg-yellow-400 text-blue-900 px-3 py-1.5 rounded-2xl shadow-xl border border-white/20">
          <span className="text-2xl font-black font-brand block leading-none">{tournament.day}</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">{tournament.month}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {tournament.type.map((t) => (
            <span key={t} className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getBadgeStyles(t)}`}>
              {t}
            </span>
          ))}
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1">
            <Trophy size={10} className="text-yellow-400" /> {tournament.prize}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2">{tournament.name}</h3>
        <div className="flex flex-col gap-1 text-gray-200 text-[10px] font-medium mb-3">
          <div className="flex items-center gap-2">
            <MapPin size={11} className="text-yellow-400" /> {tournament.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={11} className="text-yellow-400" /> {tournament.time}
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5">
          {tournament.link ? (
            <a 
              href={tournament.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-yellow-400 text-blue-900 font-black rounded-xl text-[9px] uppercase tracking-[0.1em] hover:bg-white transition-all transform hover:translate-y-[-1px] flex items-center justify-center cursor-pointer"
            >
              Ver Detalhes
            </a>
          ) : (
            <div className="w-full py-2 bg-gray-300 text-gray-500 font-black rounded-xl text-[9px] uppercase tracking-[0.1em] flex items-center justify-center cursor-not-allowed opacity-80">
              Detalhes em Breve
            </div>
          )}

          {tournament.registrationLink ? (
            <a 
              href={tournament.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-green-600 text-white font-black rounded-xl text-[9px] uppercase tracking-[0.1em] hover:bg-green-500 transition-all transform hover:translate-y-[-1px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-900/20"
            >
              <ExternalLink size={11} /> Fazer Inscrição
            </a>
          ) : (
            <div className="w-full py-2 bg-gray-300 text-gray-500 font-black rounded-xl text-[9px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 cursor-not-allowed opacity-80">
              <ExternalLink size={11} className="opacity-40" /> Inscrição Em Breve
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
