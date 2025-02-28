"use client";

import { useState, useEffect } from "react";

const AuthButtons = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Проверяем наличие токена в localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true); // Если токен найден, пользователь авторизован
        }
    }, []);

    return (
        <ul className="flex items-center">
            {!isAuthenticated ? (
                <>
                    {/* Кнопка регистрации */}
                    <li>
                        <a href="/registration" className="block mr-4 lg:px-4">
                            <button className="border-2 focus:outline-none bg-none px-6 rounded-md py-3 hover:text-black">
                                Регистрация
                            </button>
                        </a>
                    </li>
                    {/* Кнопка входа */}
                    <li>
                        <a href="/login" className="block lg:ml-4">
                            <button className="border-2 focus:outline-none bg-none px-6 rounded-md py-3 hover:text-black">
                                Войти
                            </button>
                        </a>
                    </li>
                </>
            ) : (
                // Кнопка профиля
                <li>
                    <a href="/profile" className="block lg:ml-4">
                        <button className="border-2 focus:outline-none bg-none px-6 rounded-md py-3 hover:text-black">
                            Профиль
                        </button>
                    </a>
                </li>
            )}
        </ul>
    );
};

export default AuthButtons;
