// Define global TypeScript types, interfaces, and enums here
export type TournamentType = 'Blitz' | 'Rápido' | 'Pensado';

export interface Event {
  id: string;
  name: string;
  description: string;
  types: TournamentType[];
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
  rtg_fide: boolean;
  rtd_cbx: boolean;
  rtg_lbx: boolean;
  incricao_pix: string;
  favorecido_pix: string;
  image_url: string;
  status: string;
  created_at: string;
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