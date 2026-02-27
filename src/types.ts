export interface Event {
  id: string;
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
  link_details: string | null;
  link_registration: string | null;
  link_chessresults: string | null;
  rtg_fide: boolean;
  rtd_cbx: boolean;
  rtg_lbx: boolean;
  image_url: string;
  status: string;
  created_at: string;
}
