
import React, { useState, useEffect } from 'react';
import { getEventsForYearRange, EventInfo } from '../../app/lib/actions/scheduling/scheduling';
import { motion, AnimatePresence } from 'framer-motion';

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEventsForYearRange();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
  const pastEvents = events.filter(event => new Date(event.date) < currentDate);

  const filterEvents = (events: EventInfo[]) => {
    return events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredUpcomingEvents = filterEvents(upcomingEvents);
  const filteredPastEvents = filterEvents(pastEvents);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="h-[600px] flex flex-col">
        <div className="flex mb-6">
          <button
            className={`px-4 py-2 mr-2 rounded-t-lg transition-colors duration-300 ${
              activeTab === 'upcoming' ? 'bg-[#91629b] text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors duration-300 ${
              activeTab === 'past' ? 'bg-[#91629b] text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'upcoming' && (
            <div>
              {filteredUpcomingEvents.map(event => (
                <div key={event.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span className="ml-2">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'past' && (
            <div>
              {filteredPastEvents.map(event => (
                <div key={event.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span className="ml-2">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
