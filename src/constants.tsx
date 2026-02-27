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
    id: '1',
    name: 'Mequinho',
    role: 'Grande Mestre',
    description: 'Lenda do xadrez brasileiro, Mequinho é um dos maiores jogadores de todos os tempos. Oferece aulas e mentorias para todos os níveis.',
    image: 'https://picsum.photos/seed/mequinho/200/200',
    contact: '5561999999999',
    instagram: 'https://www.instagram.com/mequinho_official/',
  },
  {
    id: '2',
    name: 'Rafael Leitão',
    role: 'Grande Mestre',
    description: 'Multicampeão brasileiro e renomado instrutor, Rafael Leitão compartilha sua vasta experiência em cursos e workshops.',
    image: 'https://picsum.photos/seed/leitao/200/200',
    contact: '5561988888888',
    instagram: 'https://www.instagram.com/gmrafaelleitao/',
  },
  {
    id: '3',
    name: 'Krikor Mekhitarian',
    role: 'Grande Mestre',
    description: 'Conhecido por seu estilo agressivo e didática envolvente, Krikor oferece treinamentos personalizados e análises de partidas.',
    image: 'https://picsum.photos/seed/krikor/200/200',
    contact: '5561977777777',
    instagram: 'https://www.instagram.com/gm_krikor/',
  },
  {
    id: '4',
    name: 'Juliana Terao',
    role: 'Mestra FIDE Feminina',
    description: 'Referência no xadrez feminino, Juliana Terao inspira e capacita novas gerações de enxadristas com seu trabalho.',
    image: 'https://picsum.photos/seed/juliana/200/200',
    contact: '5561966666666',
    instagram: 'https://www.instagram.com/julianaterao/',
  },
];
