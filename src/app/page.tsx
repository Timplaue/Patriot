"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Импортируем Link для переходов
import FeaturedNews from '../components/FeaturedNews';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface News {
    _id: string; // Добавляем ID для ссылки на новость
    title: string;
    content: string;
    imgUrl: string;
    createdAt: string; // Добавляем поле даты
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

    if (!featuredNews || !otherNews.length) {
        return <div>Загрузка...</div>; // Загрузочный экран, пока данные не получены
    }

    return (
        <main className="md:mx-[100px]">
            {/* Блок с новостью дня */}
            <FeaturedNews news={featuredNews} otherNews={otherNews} /> {/* Передаем otherNews */}

            {/* Блок с остальными новостями в слайдере */}
            <div className="w-full mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 px-4 md:px-0">Другие новости</h2>
                <Carousel
                    opts={{
                        align: "start",
                        containScroll: "trimSnaps",
                    }}
                    className="px-4 md:px-0"
                >
                    <CarouselContent>
                        {otherNews.map((news, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-10/12 sm:basis-1/2 lg:basis-1/3"
                            >
                                <div className="bg-white shadow-lg rounded-2xl overflow-hidden mr-4 h-full">
                                    <img
                                        src={news.imgUrl}
                                        alt={news.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            <Link href={`/news/${news._id}`}>{news.title}</Link> {/* Динамическая ссылка */}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500 line-clamp-3">{news.content}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Адаптивные кнопки навигации */}
                    <div className="hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>

            {/* Блок с ближайщим мероприятием */}
            {nextEvent && (
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 mb-8 border border-[#DE1A19] rounded-xl p-6 bg-white my-16">
                    {/* Левый блок с контентом */}
                    <div className="flex flex-col md:w-[60%] lg:w-[55%]">
                        <img
                            src={nextEvent.imgUrl}
                            alt={nextEvent.name}
                            className="w-full h-64 md:h-80 object-cover rounded-xl mb-4"
                        />

                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">
                                {new Date(nextEvent.date).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                {nextEvent.name}
                            </h2>
                        </div>

                        <button className="w-full md:w-fit px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Узнать больше
                        </button>
                    </div>

                    {/* Правый блок с бордером */}
                    <div className="hidden md:block flex-1 border border-[#DE1A19] rounded-xl p-4 min-h-[300px]">
                        {/* Пустой блок для будущего контента */}
                    </div>
                </div>
            )}
        </main>
    );
};

export default Home;
