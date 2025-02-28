"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        // Проверка на наличие токена в localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login"); // Если токен не найден, перенаправляем на страницу входа
            return;
        }

        // Получаем информацию о пользователе с бэкенда
        const fetchUserData = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Не удалось получить информацию о пользователе");
                }

                const data = await res.json();
                setUser(data); // Сохраняем информацию о пользователе
            } catch (err) {
                setError("Ошибка при загрузке профиля");
            }
        };

        fetchUserData();
    }, [router]);

    // Функция для выхода из системы
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login"); // Перенаправляем на страницу входа
    };

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!user) {
        return <div className="text-center">Загрузка...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#9D1915]">Мой профиль</h1>

                {/* Аватарка */}
                <div className="flex justify-center mb-6">
                    {user.avatar ? (
                        <img
                            src={`http://localhost:5000/${user.avatar}`}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#9D1915] mb-4"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-[#555555] flex items-center justify-center text-white font-bold">
                            No Avatar
                        </div>
                    )}
                </div>

                {/* Информация о пользователе */}
                <div className="space-y-4 text-lg text-[#555555]">
                    <p><strong>Имя:</strong> {user.name}</p>
                    <p><strong>Фамилия:</strong> {user.surname}</p>
                    <p><strong>Дата рождения:</strong> {user.date}</p>
                    <p><strong>Имя пользователя:</strong> {user.username}</p>
                    <p><strong>Дата регистрации:</strong> {user.registrationDate}</p>
                </div>

                {/* Кнопка выхода */}
                <div className="mt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-[#9D1915] text-white px-4 py-2 rounded-md hover:bg-[#555555] transition duration-300"
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
