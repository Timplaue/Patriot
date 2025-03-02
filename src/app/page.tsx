"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import FeaturedNews from '../components/FeaturedNews';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import YandexMap from '../components/YandexMap';

interface News {
    _id: string;
    title: string;
    content: string;
    imgUrl: string;
    createdAt: string;
}

interface Event {
    _id: string;
    name: string;
    description: string;
    date: string;
    imgUrl: string;
    location: string;
}

interface MapEvent {
    _id: string;
    title: string;
    description: string;
    type: 'military' | 'civilian' | 'other';
    coordinates: [number, number];
    date: string;
    source: string;
}

const Home: React.FC = () => {
    const [featuredNews, setFeaturedNews] = useState<News | null>(null);
    const [otherNews, setOtherNews] = useState<News[]>([]);
    const [nextEvent, setNextEvent] = useState<Event | null>(null);
    const [mapEvents, setMapEvents] = useState<MapEvent[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [selectedMapEvent, setSelectedMapEvent] = useState<MapEvent | null>(null);

    // Получение всех новостей
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/news');
                const allNews = await res.json();
                setFeaturedNews(allNews[0]);
                setOtherNews(allNews.slice(1));
            } catch (error) {
                console.error('Ошибка при получении новостей:', error);
            }
        };
        fetchNews();
    }, []);

    // Получение мероприятий
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const [nextRes, allRes] = await Promise.all([
                    fetch('http://localhost:5000/api/events/next'),
                    fetch('http://localhost:5000/api/events')
                ]);

                const nextEventData = await nextRes.json();
                const allEventsData = await allRes.json();

                setNextEvent(nextEventData);
                setAllEvents(allEventsData);
            } catch (error) {
                console.error('Ошибка при получении мероприятий:', error);
            }
        };
        fetchEvents();
    }, []);

    // Получение событий для карты
    useEffect(() => {
        const fetchMapEvents = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/map-events');
                const events = await res.json();
                setMapEvents(events);
            } catch (error) {
                console.error('Ошибка при получении событий:', error);
            }
        };
        fetchMapEvents();
    }, []);

    // Счетчик времени
    useEffect(() => {
        const event = selectedEvent || nextEvent;
        if (!event?.date) return;

        const timer = setInterval(() => {
            const eventDate = new Date(event.date).getTime();
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft(null);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [selectedEvent, nextEvent]);

    if (!featuredNews || !otherNews.length) {
        return <div>Загрузка...</div>;
    }

    const displayedEvent = selectedEvent || nextEvent;

    return (
        <main className="md:mx-[100px] mt-6">
            <FeaturedNews news={featuredNews} otherNews={otherNews} />

            {/* Блок с картой и событиями */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                {/* Список событий на карте */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-[#DE1A19] pl-4">
                        События на карте
                    </h2>
                    <div className="space-y-4">
                        {mapEvents.map((event) => (
                            <div
                                key={event._id}
                                onClick={() => setSelectedMapEvent(event)}
                                className={`p-6 rounded-xl transition-all cursor-pointer ${
                                    selectedMapEvent?._id === event._id
                                        ? "bg-[#DE1A19]/10 border-2 border-[#DE1A19]"
                                        : "bg-white hover:bg-gray-50 border border-gray-200"
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                                        <div className="mt-2 flex items-center gap-2">
                      <span
                          className={`px-2 py-1 rounded-full text-sm ${
                              event.type === "military"
                                  ? "bg-red-100 text-red-800"
                                  : event.type === "civilian"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {event.type === "military"
                            ? "Военное"
                            : event.type === "civilian"
                                ? "Гражданское"
                                : "Другое"}
                      </span>
                                            <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString("ru-RU")}
                      </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Карта */}
                <div className="h-[600px] sticky top-4">
                    <YandexMap
                        apiKey="64f1bcc8-2a27-45e0-be86-72fcb42f2602"
                        center={[50.45, 30.52]}
                        zoom={6}
                        events={mapEvents}
                        selectedEvent={selectedEvent}
                    />
                    {/*<iframe*/}
                    {/*    src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaf0417fe0c6b7e9c4d8e994257c266876d9c0c0ad60ab2193838c3d17f51e261&amp;source=constructor"*/}
                    {/*    width="749"*/}
                    {/*    height="614"*/}
                    {/*    frameBorder="0"*/}
                    {/*    style={{border: "none"}}/>*/}
                </div>
            </div>

            <div className="w-full mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 px-4 md:px-0">Другие новости</h2>
                <Carousel opts={{align: "start", containScroll: "trimSnaps"}} className="px-4 md:px-0">
                    <CarouselContent>
                    {otherNews.map((news) => (
                            <CarouselItem key={news._id} className="basis-10/12 sm:basis-1/2 lg:basis-1/3">
                                <div className="bg-white shadow-lg rounded-2xl overflow-hidden mr-4 h-full">
                                    <img src={news.imgUrl} alt={news.title} className="w-full h-40 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            <Link href={`/news/${news._id}`}>{news.title}</Link>
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500 line-clamp-3">{news.content}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>

            {displayedEvent && (
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 mb-8 border border-[#DE1A19] rounded-xl p-6 bg-white my-16">
                    <div className="flex flex-col md:w-[60%] lg:w-[55%]">
                        <img src={displayedEvent.imgUrl} alt={displayedEvent.name}
                             className="w-full h-64 md:h-80 object-cover rounded-xl mb-4" />

                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">
                                {new Date(displayedEvent.date).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{displayedEvent.name}</h2>
                            <h2 className="text-xl md:text-3xl font-bold text-gray-800">📍 г. {displayedEvent.location}</h2>
                        </div>

                        {timeLeft && (
                            <div className="mb-6">
                                <p className="text-xl font-semibold text-gray-800 mb-2">До мероприятия осталось:</p>
                                <div className="flex gap-4">
                                    {Object.entries(timeLeft).map(([unit, value]) => (
                                        <div key={unit} className="text-center">
                                            <p className="text-3xl font-bold text-[#DE1A19]">{value}</p>
                                            <p className="text-sm text-gray-500">
                                                {unit === 'days' && 'дней'}
                                                {unit === 'hours' && 'часов'}
                                                {unit === 'minutes' && 'минут'}
                                                {unit === 'seconds' && 'секунд'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Link href={`/events/${displayedEvent._id}`} className="w-fit">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Узнать больше
                            </button>
                        </Link>
                    </div>

                    <div className="hidden md:block flex-1 border border-[#DE1A19] rounded-xl p-4 min-h-[300px]">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Ближайшие мероприятия</h3>
                        <div className="space-y-3">
                            {allEvents
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                .slice(0, 3)
                                .map(event => (
                                    <div
                                        key={event._id}
                                        onClick={() => setSelectedEvent(event)}
                                        className={`group block hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer ${
                                            event._id === displayedEvent._id ? 'bg-gray-100' : ''
                                        }`}
                                    >
                                        <p className="text-sm text-gray-500 mb-1">
                                            {new Date(event.date).toLocaleDateString('ru-RU', {
                                                day: 'numeric',
                                                month: 'long'
                                            })}
                                        </p>
                                        <p className="text-base text-gray-800 font-medium group-hover:text-[#DE1A19]">
                                            {event.name}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;