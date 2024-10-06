import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { z } from "zod";
import { addOrUpdateEvent, EventInfo } from '../../app/lib/actions/scheduling/scheduling';

const EventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  date: z.date(),
  time: z.string().min(1, "Time is required"),
  type: z.enum(["SalaryDay", "BonusDay"], { required_error: "Event type is required" }),
  description: z.string().optional(),
});

const enum EventType {
  SalaryDay = 'SalaryDay',
  BonusDay = 'BonusDay',
}

type Event = z.infer<typeof EventSchema>;

export const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const openModal = (date: Date) => {
    setCurrentEvent({ id: '', title: '', date, time: '07:00', type: 'SalaryDay', description: '' });
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    setCurrentStep(1);
  };
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  

  const handleEventAction = () => {
    if (currentEvent) {
      const { isValid, errors } = validateEvent(currentEvent);
      if (isValid) {
        // if (currentEvent.id) {
        //   setEvents(events.map(e => e.id === currentEvent.id ? currentEvent : e));
        // } else {
        //   setEvents([...events, { ...currentEvent, id: Date.now().toString() }]);
        // }
        const eventInfo = convertToEventInfo(currentEvent);
        addOrUpdateEvent(eventInfo);
        closeModal();
      } else {
        setValidationErrors(errors);
      }
    }
  };

  const isAddUpdateEnabled = () => {
    return validationErrors.length === 0;
  }

  const deleteEvent = () => {
    if (currentEvent) {
      setEvents(events.filter(e => e.id !== currentEvent.id));
    }
    closeModal();
  };
  
  const renderModalContent = () => {
    return (
      <div className="relative">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {currentStep === 1 ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">Event Details</h3>
            <input
              type="text"
              placeholder="Event Title"
              value={currentEvent?.title || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent!, title: e.target.value })}
              className="w-full p-3 border rounded mb-3 text-lg"
            />
            <input
              type="time"
              value={currentEvent?.time || '07:00'}
              onChange={(e) => setCurrentEvent({ ...currentEvent!, time: e.target.value })}
              className="w-full p-3 border rounded mb-3 text-lg"
            />
            <select
              value={currentEvent?.type || 'SalaryDay'}
              onChange={(e) => setCurrentEvent({ ...currentEvent!, type: e.target.value as EventType })}
              className="w-full p-3 border rounded mb-3 text-lg"
            >
              <option value="SalaryDay">Salary Day</option>
              <option value="BonusDay">Bonus Day</option>
            </select>
            <textarea
              placeholder="Event Description (Optional)"
              value={currentEvent?.description || ''}
              onChange={(e) => setCurrentEvent({ ...currentEvent!, description: e.target.value })}
              className="w-full p-3 border rounded text-lg"
              rows={4}
            />
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">Confirm Event</h3>
            <p className="text-lg mb-2"><strong>Title:</strong> {currentEvent?.title}</p>
            <p className="text-lg mb-2"><strong>Date:</strong> {currentEvent?.date.toDateString()}</p>
            <p className="text-lg mb-2"><strong>Time:</strong> {currentEvent?.time}</p>
            <p className="text-lg mb-2"><strong>Type:</strong> {currentEvent?.type}</p>
            <p className="text-lg mb-2"><strong>Description:</strong> {currentEvent?.description}</p>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="container mx-auto p-1">
      <Calendar
        onChange={(date) => openModal(date as Date)}
        tileDisabled={({ date }) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        tileContent={({ date }) => {
          const eventsForDate = events.filter(e => e.date.toDateString() === date.toDateString());
          return eventsForDate.length > 0 ? (
            <div className="flex justify-center items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
          ) : null;
        }}
        className="w-full max-w-lg mx-auto text-2xl shadow-lg rounded-lg p-5"
      />
      <div className="text-center mt-4 text-gray-600">
        Click on a date to schedule an event.
      </div>      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
            >
              {renderModalContent()}
              {validationErrors.length > 0 && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {validationErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              <div className="mt-8 flex justify-between">
              
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 text-lg bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                )}
                {currentStep < 2 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={handleEventAction}
                      disabled={!isAddUpdateEnabled()}
                      className={`px-6 py-3 text-lg ${
                        isAddUpdateEnabled()
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-400 cursor-not-allowed'
                      } text-white rounded-lg transition-colors mr-3`}
                    >
                      {currentEvent?.id ? 'Update' : 'Add'} Event
                    </button>
                    {currentEvent?.id && (
                      <button
                        onClick={deleteEvent}
                        className="px-6 py-3 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventCalendar;

const validateEvent = (event: Partial<Event>): { isValid: boolean; errors: string[] } => {
  const result = EventSchema.safeParse(event);
  if (result.success) {
    return { isValid: true, errors: [] };
  } else {
    const errors = result.error.issues.map(issue => issue.message);
    return { isValid: false, errors };
  }
};

const convertToEventInfo = (event: Event): EventInfo => {
  return {
    id: event.id ? parseInt(event.id) : undefined,
    type: event.type.toString(),
    title: event.title,
    description: event.description || '',
    date: event.date,
    time: event.time,
    createdAt: new Date(),
    createdBy: 1 // Assuming a default value, you might want to replace this with the actual user ID
  };
};
