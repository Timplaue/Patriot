import React from 'react';

interface Event {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
}

interface EventsListProps {
    events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Все мероприятия</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event.title} className="bg-white rounded-lg shadow-md p-6">
                        <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="text-xl font-semibold mt-4">{event.title}</h3>
                        <p className="text-gray-600 mt-2">{event.description}</p>
                        <p className="text-sm text-gray-500 mt-4">Дата проведения: {new Date(event.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsList;
