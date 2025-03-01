import React from 'react';

interface News {
    title: string;
    content: string;
    imgUrl: string;
}

const FeaturedNews: React.FC<{ news: News }> = ({ news }) => {
    return (
        <div className="w-full flex flex-col md:flex-row mb-8 bg-gray-100 rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 bg-[#DE1A19] text-white px-4 py-2 text-lg md:text-xl font-semibold z-10 rounded-2xl">
                Новость дня
            </div>

            {/* Изображение */}
            <div className="w-full md:w-1/2 min-h-[250px] md:min-h-[400px]">
                <img
                    src={news.imgUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Текстовый контент */}
            <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
                    {news.title}
                </h2>
                <div>
                    <p className="text-sm text-gray-500 mb-2">Расписание</p>
                    <p className="text-base md:text-lg text-gray-600 line-clamp-5">
                        {news.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeaturedNews;