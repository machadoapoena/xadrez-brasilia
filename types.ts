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
