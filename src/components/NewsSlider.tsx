import React from 'react';

interface News {
    title: string;
    content: string;
    imgUrl: string;
}

const NewsSlider: React.FC<{ newsList: News[] }> = ({ newsList }) => {
    return (
        <div className="w-full overflow-x-auto">
            <div className="flex space-x-6">
                {newsList.map((news, index) => (
                    <div key={index} className="w-64 bg-white shadow-lg rounded-2xl overflow-hidden">
                        <img src={news.imgUrl} alt={news.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{news.title}</h3>
                            <p className="mt-2 text-sm text-gray-500">{news.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSlider;