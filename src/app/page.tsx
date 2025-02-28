"use client"

import React, { useEffect, useState } from 'react';
import FeaturedNews from '../components/FeaturedNews';
import NewsSlider from '../components/NewsSlider';

interface News {
    title: string;
    content: string;
    imgUrl: string;
}

interface Event {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
}

const Home: React.FC = () => {
    const [featuredNews, setFeaturedNews] = useState<News | null>(null);
    const [otherNews, setOtherNews] = useState<News[]>([]);
    const [nextEvent, setNextEvent] = useState<Event | null>(null);
    const [allEvents, setAllEvents] = useState<Event[]>([]);

    // Функция для получения всех новостей
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/news');
                const allNews = await res.json();
                const featured = allNews[0];  // Первая новость будет основной
                const others = allNews.slice(1);  // Остальные новости для слайдера

                setFeaturedNews(featured);
                setOtherNews(others);
            } catch (error) {
                console.error('Ошибка при получении новостей:', error);
            }
        };

        fetchNews();
    }, []);

    // Функция для получения ближайшего мероприятия
    useEffect(() => {
        const fetchNextEvent = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/events/next');
                const event = await res.json();
                setNextEvent(event);
            } catch (error) {
                console.error('Ошибка при получении ближайшего мероприятия:', error);
            }
        };

        fetchNextEvent();
    }, []);

    // Функция для получения всех мероприятий
    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/events');
                const events = await res.json();
                setAllEvents(events);
            } catch (error) {
                console.error('Ошибка при получении мероприятий:', error);
            }
        };

        fetchAllEvents();
    }, []);

    if (!featuredNews || !otherNews.length) {
        return <div>Загрузка...</div>; // Загрузочный экран, пока данные не получены
    }

    return (
        <main className="md:mx-[100px]">
            {/* Блок с новостью дня */}
            <FeaturedNews news={featuredNews} />

            {/* Блок с остальными новостями в слайдере */}
            <div className="w-full mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Другие новости</h2>
                <NewsSlider newsList={otherNews} />
            </div>

            {/* Блок с ближайщим мероприятием */}
            {nextEvent && (
                <div className="mt-12 flex items-center space-x-8 border border-[#DE1A19] rounded-2xl">
                    <div className="flex-shrink-0">
                        <img src={nextEvent.imageUrl} alt={nextEvent.title} className="w-48 h-48 object-cover rounded-lg" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-semibold text-gray-800">{nextEvent.title}</h2>
                        <p className="mt-2 text-lg text-gray-600">{nextEvent.description}</p>
                        <p className="mt-4 text-sm text-gray-500">Дата проведения: {new Date(nextEvent.date).toLocaleDateString()}</p>
                        <button className="mt-4 p-2 bg-blue-500 text-white rounded">Узнать больше</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;
