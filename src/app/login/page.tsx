"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Используйте next/navigation вместо next/router

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);  // Сохраняем токен
            router.push('/profile');  // Перенаправляем в личный кабинет
        } else {
            setError(data.message || 'Ошибка авторизации');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg border border-gray-300">
                <h2 className="text-center text-3xl text-gray-900 font-semibold mb-6">Авторизация</h2>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Имя пользователя</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-[#9D1915] text-white rounded-lg font-semibold hover:bg-black transition duration-300"
                    >
                        Войти
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p>Нет аккаунта? <a href="/registration" className="text-[#9D1915]">Зарегистрироваться</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;