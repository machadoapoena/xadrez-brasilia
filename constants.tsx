
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

// Helper to handle DD/MM/YYYY dates
const createEventDate = (dateStr: string) => {
  const [d, m, y] = dateStr.split('/').map(Number);
  return {
    day: d,
    monthIndex: m - 1,
    year: y,
    month: MONTH_NAMES_SHORT[m - 1]
  };
};

// --- Configuration ---
export const LOGO_URL = "https://imagens.xadrezbrasilia.com/imagens/logo_xb.png";

// --- Tournament Data ---
// A lista é exportada já ordenada por data para garantir consistência em toda a aplicação
// Fix: Added explicit casting to Tournament[] on the array literal before sorting to prevent TypeScript 
// from widening the 'type' property from TournamentType[] to string[].
export const TOURNAMENTS: Tournament[] = ([
  { 
    id: 1, 
    name: "Capivárias", 
    ...createEventDate("07/03/2026"),
    time: "09:00", 
    location: "Liberty Mall (Brasília, DF)", 
    type: ["Rápido"], 
    prize: "Troféus e Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_capivarias.JPG", 
    link: "https://mearas.com.br/capivarias/"
  },
  { 
    id: 2, 
    name: "Torneio LBX Carnaval", 
    ...createEventDate("17/02/2026"),
    time: "15:00", 
    location: "Cluber ASCADE (Brasília, DF)", 
    type: ["Rápido"], 
    prize: "Troféus e Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_lbxcarna.JPG", 
  },
  { 
    id: 3, 
    name: "LBX Aberto Plaza Norte", 
    ...createEventDate("28/02/2026"),
    time: "15:00", 
    location: "Plaza Norte (Brasília, DF)", 
    type: ["Rápido"], 
    prize: "Troféus e Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_lbxabertoplaza.JPG", 
    link: "https://xadrezdf.com.br/",
    registrationLink: "https://xadrezdf.com.br/"
  },
  { 
    id: 4, 
    name: "Circuito Brasiliense", 
    ...createEventDate("14/03/2026"),
    time: "15:00", 
    location: "Clube ASTCU (Brasília, DF)", 
    type: ["Rápido"], 
    prize: "R$ 630,00 e Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_circfbxrapid.JPG", 
    link: "https://gerenciador-circuito-xadrez.vercel.app/",
  }
] as Tournament[]).sort((a, b) => {
  const dateA = new Date(a.year, a.monthIndex, a.day).getTime();
  const dateB = new Date(b.year, b.monthIndex, b.day).getTime();
  return dateA - dateB;
});
