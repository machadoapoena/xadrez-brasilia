import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are defined
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Event {
  id: string;
  created_at: string;
  name: string;
  types: string;
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
  rtg_fide: string;
  rtd_cbx: string;
  link_players: string;
  link_resultado: string;
  rtg_lbx: string;
}

// You can add functions here to interact with your 'events' table, for example:
// export async function getEvents() {
//   const { data, error } = await supabase.from<Event>('events').select('*');
//   if (error) throw error;
//   return data;
// }
