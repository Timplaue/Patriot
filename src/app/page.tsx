"use client"

import React, { useEffect, useState } from 'react';
import FeaturedNews from '../components/FeaturedNews';
import NewsSlider from '../components/NewsSlider';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface News {
    title: string;
    content: string;
    imgUrl: string;
}

interface Event {
    name: string;
    description: string;
    date: string;
    imgUrl: string;
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
                <Carousel>
                    <CarouselContent>
                        <CarouselItem><NewsSlider newsList={otherNews} /></CarouselItem>
                        <CarouselItem>...</CarouselItem>
                        <CarouselItem>...</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            {/* Блок с ближайщим мероприятием */}
            {nextEvent && (
                <div className="mt-12 flex w-full border-2 border-[#DE1A19] rounded-2xl shadow-lg overflow-hidden bg-white">
                    {/* Левый блок с контентом */}
                    <div className="flex flex-col p-8 space-y-4">
                        <img
                            src={nextEvent.imgUrl}
                            alt={nextEvent.name}
                            className="w-56 h-56 object-cover rounded-xl shadow-sm"
                        />

                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium text-[#DE1A19]">
                                {new Date(nextEvent.date).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                {nextEvent.name}
                            </h2>
                        </div>

                        <button className="self-start px-6 py-2.5 bg-[#DE1A19] text-white rounded-lg
                        hover:bg-[#C21615] transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#DE1A19] focus:ring-offset-2">
                            Узнать больше
                        </button>
                    </div>

                    {/* Правый блок с бордером */}
                    <div className="w-1/4 border-l-2 border-[#DE1A19] bg-gray-50/50" />
                </div>
            )}
        </main>
    );
};

export default Home;
