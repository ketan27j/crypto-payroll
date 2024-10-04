
import React, { useState, useEffect } from 'react';
import { getEventsForYearRange, EventInfo } from '../../app/lib/actions/scheduling/scheduling';
import { motion, AnimatePresence } from 'framer-motion';

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEventsForYearRange();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const currentDate = new Date();
  console.log('currentDate', currentDate);
  const upcomingEvents = events.filter(event => {
    console.log('event.date)', new Date(event.date));
    return new Date(event.date) > currentDate;
  });
  const pastEvents = events.filter(event => new Date(event.date) < currentDate);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Events</h2>
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 mr-2 rounded-t-lg transition-colors duration-300 ${
            activeTab === 'upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Events
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors duration-300 ${
            activeTab === 'past' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past Events
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          {(activeTab === 'upcoming' ? upcomingEvents : pastEvents).map(event => (
            <div key={event.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <span className="ml-2">{event.time}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
