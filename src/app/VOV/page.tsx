"use client"

import React, { useState, useEffect } from "react";

interface Human {
    name: string;
    surname: string;
    patronymic: string;
    imgUrl: string;
    location: string;
    post: string;
    date: string;
}

const PeoplePage: React.FC = () => {
    const [humans, setHumans] = useState<Human[]>([]);
    const [searchParams, setSearchParams] = useState({
        name: "",
        surname: "",
        patronymic: "",
        date: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams(searchParams).toString();
            const res = await fetch(`http://localhost:5000/api/humans?${query}`);
            const data = await res.json();
            setHumans(data);
        } catch (error) {
            console.error("Ошибка при поиске:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className="container mx-auto p-4 lg:p-6">
            {/* Шапка */}
            <div className="bg-red-500 text-white p-4 rounded-t-xl mb-4 md:mb-6">
                <h1 className="text-lg md:text-xl font-bold">История Великой Отечественной войны</h1>
                <p className="text-sm md:text-base">Архивные документы / Биографии героев</p>
            </div>

            {/* Форма поиска */}
            <div className="flex flex-col md:flex-row gap-2 mb-4 md:mb-6">
                <div className="flex flex-col md:flex-row w-full gap-2">
                    <input
                        type="text"
                        placeholder="Имя"
                        value={searchParams.name}
                        onChange={(e) => setSearchParams(prev => ({...prev, name: e.target.value}))}
                        className="p-2 border border-gray-300 rounded-md md:rounded-l-md md:rounded-r-none flex-1"
                    />
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={searchParams.surname}
                        onChange={(e) => setSearchParams(prev => ({...prev, surname: e.target.value}))}
                        className="p-2 border border-gray-300 rounded-md md:rounded-none flex-1"
                    />
                    <input
                        type="text"
                        placeholder="Дата рождения"
                        value={searchParams.date}
                        onChange={(e) => setSearchParams(prev => ({...prev, year: e.target.value}))}
                        className="p-2 border border-gray-300 rounded-md md:rounded-r-md flex-1"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-[#9D1915] text-white p-2 rounded-md md:ml-4 md:w-auto w-full"
                >
                    Поиск
                </button>
            </div>

            {/* Результаты поиска */}
            {loading ? (
                <p className="text-center">Загрузка...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {humans.map((human, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row bg-white p-4 border border-gray-200 rounded-lg"
                        >
                            <img
                                src={human.imgUrl}
                                alt={`${human.name} ${human.surname}`}
                                className="w-full md:w-32 h-32 object-cover mx-auto mb-4 md:mb-0"
                            />
                            <div className="md:ml-4 text-center md:text-left">
                                <h3 className="text-base md:text-lg font-semibold text-[#9D1915]">
                                    {human.surname} {human.name} {human.patronymic}
                                </h3>
                                <p className="text-sm text-[#9D1915] mt-2">{human.location}</p>
                                <p className="text-sm text-[#9D1915]">{human.post}</p>
                                <p className="text-sm text-[#9D1915]">
                                    {new Date(human.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PeoplePage;