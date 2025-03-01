"use client";

import React, { useState } from "react";

// Моковые данные для видео
const mockData = [
    {
        title: "Репортаж из зоны СВО о наступательных боях в районе Серебрянского лесничества",
        videoUrl: "https://www.youtube.com/embed/it_F7w-5oYw",
        category: "СВО-Хроника",
        views: "464 тыс. просмотров",
        timeAgo: "2 недели назад",
        imgUrl: "https://avatars.mds.yandex.net/i?id=34a28a2430cb53850947cab0985f5343_l-8211098-images-thumbs&n=13",
    },
    {
        title: "Репортаж: Люди СВО",
        videoUrl: "https://www.youtube.com/embed/W98Ta3FFR-0",
        category: "СВО-Хроника",
        views: "21 тыс. просмотров",
        timeAgo: "2 недели назад",
        imgUrl: "/images/video2.jpeg",
    },
    {
        title: "Репортаж из зоны СВО о наступательных боях в районе Киева",
        videoUrl: "https://www.youtube.com/embed/rPkJfaWqWo0",
        category: "Подвиги",
        views: "464 тыс. просмотров",
        timeAgo: "2 недели назад",
        imgUrl: "/images/video2.jpeg",
    },
];

const Home: React.FC = () => {
    const [activeTab, setActiveTab] = useState("СВО-Хроника");
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);
    const [videos] = useState(mockData);

    // Фильтрация видео по активной вкладке
    const filteredVideos = videos.filter((video) => video.category === activeTab);

    // Функция для преобразования обычной YouTube-ссылки в embed
    const convertToEmbedUrl = (url: string) => {
        if (url.includes("embed")) return url;
        const videoId = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div className="p-4 md:px-[100px]">
            {/* Заголовок и поиск */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-red-600">СВО видеорепортажи</h1>
                <input
                    type="text"
                    placeholder="Поиск видео"
                    className="p-2 border rounded-md"
                />
            </div>

            {/* Вкладки */}
            <div className="flex space-x-4 mb-8">
                <button
                    onClick={() => setActiveTab("СВО-Хроника")}
                    className={`px-6 py-2 rounded-md text-lg ${activeTab === "СВО-Хроника" ? "bg-red-600 text-white" : "bg-gray-200"}`}
                >
                    СВО-Хроника
                </button>
                <button
                    onClick={() => setActiveTab("Подвиги")}
                    className={`px-6 py-2 rounded-md text-lg ${activeTab === "Подвиги" ? "bg-red-600 text-white" : "bg-gray-200"}`}
                >
                    Подвиги
                </button>
            </div>

            {/* Видео контент */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden">
                        <div className="relative pt-[56.25%]">
                            {playingVideo === video.videoUrl ? (
                                <iframe
                                    src={convertToEmbedUrl(video.videoUrl)}
                                    title={video.title}
                                    className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <img
                                        src={video.imgUrl}
                                        alt={video.title}
                                        className="w-full h-full object-cover rounded-xl cursor-pointer"
                                        onClick={() => setPlayingVideo(video.videoUrl)}
                                    />
                                    <button
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        onClick={() => setPlayingVideo(video.videoUrl)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-16 w-16 text-red-600 hover:text-red-700 transition-colors"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                            <p className="mt-2 text-sm text-gray-500">{video.views} · {video.timeAgo}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;