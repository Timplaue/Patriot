"use client";

import { useState, useEffect } from "react";

const AuthButtons = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Функция проверки аутентификации
    const checkAuth = () => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        // Проверяем при монтировании
        checkAuth();

        // Подписываемся на изменения localStorage
        const handleStorageChange = () => {
            checkAuth();
        };

        // Событие срабатывает при изменении localStorage в других вкладках
        window.addEventListener("storage", handleStorageChange);

        // Событие для обновления в текущей вкладке
        window.addEventListener("auth", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("auth", handleStorageChange);
        };
    }, []);

    return (
        <ul className="flex items-center">
            {!isAuthenticated ? (
                <>
                    <li>
                        <a href="/login" className="block lg:ml-4">
                            <button className="border-2 focus:outline-none bg-none px-6 rounded-md py-3 hover:text-black">
                                Войти
                            </button>
                        </a>
                    </li>
                </>
            ) : (
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