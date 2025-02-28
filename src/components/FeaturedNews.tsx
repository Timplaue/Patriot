import React from 'react';

interface News {
    title: string;
    content: string;
    imgUrl: string;
}

const FeaturedNews: React.FC<{ news: News }> = ({ news }) => {
    return (
        <div className="w-full flex flex-col md:flex-row mb-8 bg-gray-100 rounded-2xl overflow-hidden relative">
            {/* Красный прямоугольник с текстом "Новость дня" */}
            <div className="absolute top-0 left-0 bg-[#DE1A19] text-white px-4 py-2 text-xl font-semibold z-10 rounded-2xl">
                Новость дня
            </div>

            <div className="w-full md:w-1/2">
                <img src={news.imgUrl} alt={news.title} className="w-full h-full object-cover"/>
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <h2 className="text-3xl font-bold text-gray-800">{news.title}</h2>
                <p className="mt-4 text-lg text-gray-600">{news.content}</p>
            </div>
        </div>

    );
};

export default FeaturedNews;