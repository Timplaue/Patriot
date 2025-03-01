import React from 'react';
import Link from 'next/link'; // Добавляем импорт Link

interface News {
    _id: string;
    title: string;
    content: string;
    imgUrl: string;
    createdAt: string;
}

interface FeaturedNewsProps {
    news: News;
    otherNews?: News[];
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ news, otherNews }) => {
    return (
        <div className="w-full flex flex-col md:flex-row mb-8 bg-gray-100 rounded-2xl overflow-hidden relative">
            {/* Красный прямоугольник с текстом "Новость дня" */}
            <div className="absolute top-0 left-0 bg-[#DE1A19] text-white px-4 py-2 text-lg md:text-xl font-semibold z-10 rounded-2xl">
                Новость дня
            </div>

            {/* Блок с изображением и затемнением */}
            <div className="w-full md:w-1/2 min-h-[250px] md:min-h-[400px] relative">
                <img
                    src={news.imgUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h2 className="text-xl md:text-3xl font-bold text-white">
                        {news.title}
                    </h2>
                    <Link href={`/news/${news._id}`}> {/* Обновляем кнопку */}
                        <button className="rounded-xl bg-gradient-to-r from-red-600 to-yellow-500 text-white py-2 px-4 my-5 md:min-w-60">
                            Читать далее
                        </button>
                    </Link>
                </div>
            </div>

            {/* Список новостей */}
            <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
                <div>
                    <p className="text-2xl mb-2 text-[#9D1915] text-center my-3 mb-4">Новости на сегодня</p>

                    <div className="space-y-4">
                        {otherNews && otherNews.length > 0 ? (
                            otherNews.map((item) => (
                                <div key={item._id} className="flex items-center space-x-4">
                                    <p className="text-sm text-gray-500 whitespace-nowrap">
                                        {new Date(item.createdAt).toLocaleDateString('ru-RU', {
                                            day: 'numeric',
                                            month: 'long',
                                        })}
                                    </p>
                                    <Link href={`/news/${item._id}`} className="hover:underline"> {/* Добавляем ссылку */}
                                        <p className="text-base text-gray-800 font-medium hover:text-blue-600 transition-colors cursor-pointer">
                                            {item.title}
                                        </p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Новостей пока нет</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedNews;