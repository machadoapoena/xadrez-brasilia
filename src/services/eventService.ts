import { supabase } from './supabaseClient';

export interface Event {
  id: string;
  created_at: string;
  name: string;
  types: string[];
  date: string;
  time: string;
  location: string;
  city: string;
  state: string;
  prize: string;
  link_details: string;
  link_registration: string;
  link_chessresults: string;
  status: string;
  image_url: string;
  contact: string;
  description: string;
  rtg_fide: number;
  rtd_cbx: number;
  link_players: string;
  link_resultado: string;
  rtg_lbx: number;
}

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('EVENTS')
    .select('*');

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data as Event[];
}
