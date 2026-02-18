
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
  chessResultsLink?: string;
  contact?: string; // Campo opcional para contato via WhatsApp
}

export interface Partner {
  id: number;
  name: string;
  role: string;
  contact: string;
  instagram?: string;
  image: string;
  description: string;
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
    link: "https://mearas.com.br/capivarias/",
    contact: "5561981684530"
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
    contact: "5561981222312",
    chessResultsLink: "https://s2.chess-results.com/tnr1353882.aspx?lan=1"
  },
  { 
    id: 3, 
    name: "LBX Aberto Plaza Norte", 
    ...createEventDate("28/02/2026"),
    time: "15:00", 
    location: "Plaza Norte (Brasília, DF)", 
    type: ["Rápido"], 
    prize: "Troféus e Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_lbxabertoplaza.png", 
    link: "https://xadrezdf.com.br/?xa=c4ca4238a0b923820dcc509a6f75849b&xs=231141b34c82aa95e48810a9d1b33a79",
    registrationLink: "https://xadrezdf.com.br/?xa=c4ca4238a0b923820dcc509a6f75849b&xs=231141b34c82aa95e48810a9d1b33a79",
    chessResultsLink: "https://s2.chess-results.com/tnr1347185.aspx?lan=10",
    contact: "5561981222312"
  },
  { 
    id: 4, 
    name: "Circuito Brasiliense", 
    ...createEventDate("14/03/2026"),
    time: "15:00", 
    location: "Clube ASTCU (Brasília, DF)", 
    type: ["Rápido"], 
    prize: "R$ 630,00 e Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_circfbxrapid.png", 
    link: "https://gerenciador-circuito-xadrez.vercel.app/",
    // Sem contato para testar o botão cinza
  },
  { 
    id: 5, 
    name: "I Torneio de Xadrez FUP 2026", 
    ...createEventDate("07/03/2026"),
    time: "15:00", 
    location: "UNB Planaltina (Brasília, DF)", 
    type: ["Rápido"], 
    prize: "Troféus e Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_fup.jpg", 
    link: "https://docs.google.com/forms/d/e/1FAIpQLScW4XFy2V5rTj_KOklL-DViMU1_71KSpupptzruRDT107SOJg/viewform",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLScW4XFy2V5rTj_KOklL-DViMU1_71KSpupptzruRDT107SOJg/viewform",
    chessResultsLink: "https://s3.chess-results.com/tnr1336608.aspx?lan=10&turdet=YES&SNode=S0",
    contact: "5561998058689"
  },
  { 
    id: 6, 
    name: "Torneio LBX Carnaval Blitz", 
    ...createEventDate("14/02/2026"),
    time: "08:30", 
    location: "Rua CIOPS Lunabel (Novo Gama/GO)", 
    type: ["Blitz"], 
    prize: "Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_lbxcarnablitz.JPG",
    chessResultsLink: "https://s2.chess-results.com/tnr1353358.aspx?lan=10&SNode=S0"
    // Sem contato para testar o botão cinza
  },
  { 
    id: 7, 
    name: "LBX Carnaval Capivarou Arremate Bloco GCX", 
    ...createEventDate("15/02/2026"),
    time: "14:30", 
    location: "St. Leste Q 22 - (Gama, DF)", 
    type: ["Rápido"], 
    prize: "Rodízio de Pizza", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_lbxdivina.JPG",
    chessResultsLink: "https://s3.chess-results.com/tnr1353815.aspx?lan=1",
    contact: "5561981222312"
  },
  { 
    id: 8, 
    name: "Festival Brasiliense da Juventude de Xadrez", 
    ...createEventDate("21/02/2026"),
    time: "09:30", 
    location: "Clube ASSEFE - (Brasília, DF)", 
    type: ["Pensado"], 
    prize: "Troféus e Medalhas", 
    image: "https://imagens.xadrezbrasilia.com/imagens/tr_fbxj.JPG",
    contact: "556181484131"
  }
] as Tournament[]).sort((a, b) => {
  const dateA = new Date(a.year, a.monthIndex, a.day).getTime();
  const dateB = new Date(b.year, b.monthIndex, b.day).getTime();
  return dateA - dateB;
});

// --- Partners Data (Schools & Teachers) ---
export const PARTNERS: Partner[] = [
  {
    id: 1,
    name: "Mearas",
    role: "Escola de Xadrez",
    contact: "5561981684530",
    instagram: "https://www.instagram.com/mearassports/",
    image: "https://fbx.org.br/wp-content/uploads/2019/12/Mearas-Escola-de-Xadrez-394x330.png",
    description: "Referência no DF, especializada em festivais interescolares e formação de base sólida."
  },
  {
    id: 2,
    name: "Xadrez do Valle",
    role: "Centro de Treinamento",
    contact: "556183046464",
    instagram: "https://www.instagram.com/xadrezvalle/",
    image: "https://xadrezvalle.com.br/wp-content/uploads/2022/12/Marca-XadrezValle-2024-251x95.png",
    description: "Cursos presenciais e online focados em performance competitiva e estratégia avançada."
  },
  {
    id: 3,
    name: "Mister Chess",
    role: "Instrutor Online",
    contact: "556182515940",
    instagram: "https://www.instagram.com/nm.malcolm/",
    image: "https://imagens.xadrezbrasilia.com/imagens/logo_misterchess.png",
    description: "Treinamento online focados em performance competitiva e estratégia avançada."
  },
  {
    id: 4,
    name: "CID",
    role: "Escola de Xadrez",
    contact: "556181167386",
    instagram: "https://www.instagram.com/cidxadreztag/",
    image: "https://imagens.xadrezbrasilia.com/imagens/logo_cid.png",
    description: "Aulas presenciais no CED 02 de Taguatinga- Centrão. As segundas, quartas e sextas. Gratuito. Horários 7h30, 8h30, 9h30 pela manhã, 14h30, 15h30 e 16h30 à tarde."
  },
  {
    id: 5,
    name: "FM Luigy Lira",
    role: "Instrutor",
    contact: "5561998058689",
    instagram: "https://www.instagram.com/liraluigy/",
    image: "https://imagens.xadrezbrasilia.com/imagens/pf_luigy.png",
    description: "Aulas personalizadas para todas as idades. Do iniciante ao avançado."
  },
  {
    id: 6,
    name: "Alexandre Bernardo",
    role: "Instrutor",
    contact: "5561982093023",
    instagram: "https://www.youtube.com/@tioalexadrez",
    image: "https://imagens.xadrezbrasilia.com/imagens/pf_alexbarb.png",
    description: "Professor de Xadrez para crianças (básico ao avançado) e escritor de livros infantis para o ensino de Xadrez (A Jornada do Peão e Capivarada pela Editora Acolibri)."
  }
];
