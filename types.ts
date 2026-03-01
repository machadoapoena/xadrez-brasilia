export type TournamentType = 'Blitz' | 'Rápido' | 'Pensado' | '960';

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

export interface Event {
  id?: number;
  name: string;
  description: string;
  types: string[];
  date: string;
  time: string;
  location: string;
  city: string;
  state: string;
  prize: string;
  contact: string;
  link_details: string;
  link_registration: string;
  link_chessresults: string;
  incricao_pix: string;
  favorecido_pix: string;
  rtg_fide: boolean;
  rtd_cbx: boolean;
  rtg_lbx: boolean;
  image_url: string;
  status: string;
}
