import React from 'react';
import { notFound } from 'next/navigation';

interface News {
    _id: string;
    title: string;
    content: string;
    imgUrl: string;
    createdAt: string;
}

async function getNews(id: string) {
    const res = await fetch(`http://localhost:5000/api/news/${id}`);
    if (!res.ok) return undefined;
    return res.json();
}

export default async function NewsPage({ params }: { params: { id: string } }) {
    const news: News = await getNews(params.id);

    if (!news) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            <img
                src={news.imgUrl}
                alt={news.title}
                className="w-full h-96 object-cover mb-6 rounded-xl"
            />
            <div className="prose max-w-none">
                <p className="text-gray-500 mb-4">
                    {new Date(news.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
                <p>{news.content}</p>
            </div>
        </div>
    );
}