
import React from 'react';

// --- Date Utils ---
export const NOW = new Date();
export const TODAY_DAY = NOW.getDate();
export const TODAY_MONTH = NOW.getMonth();
export const TODAY_YEAR = NOW.getFullYear();

export const MONTH_NAMES_SHORT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
export const MONTH_NAMES_FULL = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// --- Types ---
export type TournamentType = 'Blitz' | 'Rápido' | 'Pensado';

export interface Tournament {
  id: number;
  name: string;
  day: number;
  month: string;
  monthIndex: number; 
  year: number;
  time: string;
  location: string;
  type: TournamentType[];
  prize: string;
  image: string;
  link?: string;
  registrationLink?: string;
}

// --- Configuration ---
export const LOGO_URL = "https://imagens.xadrezbrasilia.com/imagens/logo_xb.png";

// --- Tournament Data ---
export const TOURNAMENTS: Tournament[] = [
  { 
    id: 1, 
    name: "Festival Internacional de Brasília", 
    day: TODAY_DAY + 2, 
    month: MONTH_NAMES_SHORT[TODAY_MONTH], 
    monthIndex: TODAY_MONTH, 
    year: TODAY_YEAR, 
    time: "09:00", 
    location: "Brasília, DF", 
    type: ["Pensado", "Rápido", "Blitz"], 
    prize: "R$ 15.000", 
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=400", 
    link: "https://cbx.org.br",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_XadrezBrasilia1/viewform"
  },
  { 
    id: 10, 
    name: "Torneio em Breve", 
    day: TODAY_DAY + 3, 
    month: MONTH_NAMES_SHORT[TODAY_MONTH], 
    monthIndex: TODAY_MONTH, 
    year: TODAY_YEAR, 
    time: "14:00", 
    location: "Sudoeste, DF", 
    type: ["Blitz"], 
    prize: "Troféus e Medalhas", 
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&q=80&w=400", 
  },
  { 
    id: 2, 
    name: "Masters de São Paulo", 
    day: TODAY_DAY + 8, 
    month: MONTH_NAMES_SHORT[TODAY_MONTH], 
    monthIndex: TODAY_MONTH, 
    year: TODAY_YEAR, 
    time: "10:00", 
    location: "São Paulo, SP", 
    type: ["Rápido", "Blitz"], 
    prize: "R$ 10.000", 
    image: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?auto=format&fit=crop&q=80&w=400", 
    link: "https://fpx.org.br",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_XadrezBrasilia2/viewform"
  },
  { 
    id: 3, 
    name: "Torneio Relâmpago Copacabana", 
    day: TODAY_DAY + 5, 
    month: MONTH_NAMES_SHORT[TODAY_MONTH], 
    monthIndex: TODAY_MONTH, 
    year: TODAY_YEAR, 
    time: "18:30", 
    location: "Rio de Janeiro, RJ", 
    type: ["Blitz"], 
    prize: "R$ 1.500", 
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&q=80&w=400", 
    link: "https://fexerj.org.br",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_XadrezBrasilia3/viewform"
  },
  { 
    id: 4, 
    name: "Copa Sul de Xadrez", 
    day: TODAY_DAY + 12, 
    month: MONTH_NAMES_SHORT[TODAY_MONTH], 
    monthIndex: TODAY_MONTH, 
    year: TODAY_YEAR, 
    time: "08:00", 
    location: "Curitiba, PR", 
    type: ["Pensado"], 
    prize: "R$ 3.000", 
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&q=80&w=400", 
    link: "https://fexpar.org.br",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_XadrezBrasilia4/viewform"
  },
  { 
    id: 5, 
    name: "Nordeste Chess Open", 
    day: TODAY_DAY + 15, 
    month: MONTH_NAMES_SHORT[TODAY_MONTH], 
    monthIndex: TODAY_MONTH, 
    year: TODAY_YEAR, 
    time: "14:00", 
    location: "Recife, PE", 
    type: ["Rápido"], 
    prize: "R$ 4.500", 
    image: "https://images.unsplash.com/photo-1544081044-100881f7371d?auto=format&fit=crop&q=80&w=400", 
    link: "https://fpxne.org.br",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_XadrezBrasilia5/viewform"
  },
  { 
    id: 8, 
    name: "Blitz Noturno DF", 
    day: TODAY_DAY + 2, 
    month: MONTH_NAMES_SHORT[TODAY_MONTH], 
    monthIndex: TODAY_MONTH, 
    year: TODAY_YEAR, 
    time: "20:00", 
    location: "Brasília, DF", 
    type: ["Blitz"], 
    prize: "R$ 500", 
    image: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&q=80&w=400", 
    link: "https://xadrezbrasilia.com.br",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_XadrezBrasilia8/viewform"
  },
  { 
    id: 6, 
    name: "Open de Inverno BH", 
    day: TODAY_DAY + 18, 
    month: MONTH_NAMES_SHORT[TODAY_MONTH], 
    monthIndex: TODAY_MONTH, 
    year: TODAY_YEAR, 
    time: "09:00", 
    location: "Belo Horizonte, MG", 
    type: ["Pensado", "Blitz"], 
    prize: "R$ 2.000", 
    image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&q=80&w=400", 
    link: "https://fmx.org.br",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfD_XadrezBrasilia6/viewform"
  },
];
