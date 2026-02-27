import { supabase } from './supabaseClient';

export const fetchTournaments = async () => {
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching tournaments:', error);
    return [];
  }
  return data;
};
