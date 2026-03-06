import { supabase } from '../supabaseClient';
import { Event, Tournament } from '../types';
import { MONTH_NAMES_SHORT } from '../constants';

export const fetchEvents = async (): Promise<Tournament[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return (data || []).map((event: any) => {
    const eventDate = new Date(event.date);
    // Adjust for timezone issues if necessary, but usually date strings from Supabase are fine
    const d = eventDate.getUTCDate();
    const m = eventDate.getUTCMonth();
    const y = eventDate.getUTCFullYear();

    return {
      ...event,
      time: event.time?.slice(0, 5),
      day: d,
      monthIndex: m,
      year: y,
      month: MONTH_NAMES_SHORT[m]
    };
  });
};