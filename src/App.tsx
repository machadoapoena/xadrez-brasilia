import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  // Add any other fields your 'events' table has
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*');

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        setEvents(data as Event[]);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Upcoming Chess Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{event.name}</h2>
            <p className="text-gray-600 mb-1">Date: {event.date}</p>
            <p className="text-gray-600">Location: {event.location}</p>
            {/* Add more event details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;