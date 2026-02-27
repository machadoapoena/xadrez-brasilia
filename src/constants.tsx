export enum TournamentType {
  RAPID = 'RAPID',
  BLITZ = 'BLITZ',
  CLASSIC = 'CLASSIC',
  ARENA = 'ARENA',
}

export const TOURNAMENTS: any[] = [];

export const LOGO_URL = '/logo.png';

export const MONTH_NAMES_FULL = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const MONTH_NAMES_SHORT = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

const today = new Date();
export const TODAY_YEAR = today.getFullYear();
export const TODAY_MONTH = today.getMonth();
export const TODAY_DAY = today.getDate();

export interface Partner {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  contact: string;
  instagram?: string;
} 

export const PARTNERS: Partner[] = [
  {
    id: "1",
    name: "Mearas",
    role: "Escola de Xadrez",
    contact: "5561981684530",
    instagram: "https://www.instagram.com/mearassports/",
    image: "https://fbx.org.br/wp-content/uploads/2019/12/Mearas-Escola-de-Xadrez-394x330.png",
    description: "Referência no DF, especializada em festivais interescolares e formação de base sólida."
  },
  {
    id: "2",
    name: "Xadrez do Valle",
    role: "Centro de Treinamento",
    contact: "556183046464",
    instagram: "https://www.instagram.com/xadrezvalle/",
    image: "https://xadrezvalle.com.br/wp-content/uploads/2022/12/Marca-XadrezValle-2024-251x95.png",
    description: "Cursos presenciais e online focados em performance competitiva e estratégia avançada."
  },
  {
    id: "3",
    name: "Mister Chess",
    role: "Instrutor Online",
    contact: "556182515940",
    instagram: "https://www.instagram.com/nm.malcolm/",
    image: "https://imagens.xadrezbrasilia.com/imagens/logo_misterchess.png",
    description: "Treinamento online focados em performance competitiva e estratégia avançada."
  },
  {
    id: "4",
    name: "CID",
    role: "Escola de Xadrez",
    contact: "556181167386",
    instagram: "https://www.instagram.com/cidxadreztag/",
    image: "https://imagens.xadrezbrasilia.com/imagens/logo_cid.png",
    description: "Aulas presenciais no CED 02 de Taguatinga- Centrão. As segundas, quartas e sextas. Gratuito. Horários 7h30, 8h30, 9h30 pela manhã, 14h30, 15h30 e 16h30 à tarde."
  },
  {
    id: "5",
    name: "FM Luigy Lira",
    role: "Instrutor",
    contact: "5561998058689",
    instagram: "https://www.instagram.com/liraluigy/",
    image: "https://imagens.xadrezbrasilia.com/imagens/pf_luigy.png",
    description: "Aulas personalizadas para todas as idades. Do iniciante ao avançado."
  },
  {
    id: "6",
    name: "Alexandre Bernardo",
    role: "Instrutor",
    contact: "5561982093023",
    instagram: "https://www.youtube.com/@tioalexadrez",
    image: "https://imagens.xadrezbrasilia.com/imagens/pf_alexbarb.png",
    description: "Professor de Xadrez para crianças (básico ao avançado) e escritor de livros infantis para o ensino de Xadrez (A Jornada do Peão e Capivarada pela Editora Acolibri)."
  }
];
