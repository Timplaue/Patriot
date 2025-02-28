"use client";

import { useState, useEffect } from "react";

const Forum = () => {
    const [posts, setPosts] = useState([]); // Инициализация posts как пустой массив
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        // Получаем посты с пагинацией
        const fetchPosts = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/forum?page=${page}&limit=5`);
                if (!res.ok) throw new Error('Ошибка при загрузке данных');
                const data = await res.json();
                setPosts(data.posts || []); // Обеспечиваем, чтобы в случае ошибки или пустого ответа posts всегда был массивом
                setTotalPages(data.totalPages || 1); // В случае ошибки, установим значение 1
            } catch (err) {
                console.error("Ошибка при получении сообщений форума:", err);
                setError("Ошибка при получении сообщений.");
            }
        };

        fetchPosts();
    }, [isClient, page]);

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Пожалуйста, войдите в систему.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/forum", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            const newPost = await res.json();
            if (res.status === 201) {
                setPosts([newPost, ...posts]);
                setTitle("");
                setContent("");
            } else {
                setError(newPost.message || "Ошибка при создании сообщения.");
            }
        } catch (err) {
            setError("Ошибка при отправке сообщения.");
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    if (!isClient) return null;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Форум</h1>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handlePostSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded w-full mb-2"
                    required
                />
                <textarea
                    placeholder="Сообщение"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 border rounded w-full mb-2"
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Отправить сообщение</button>
            </form>

            <div>
                <h2 className="text-xl font-semibold mb-2">Сообщения:</h2>
                <ul>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <li key={post._id} className="border-b pb-4 mb-4">
                                <h3 className="font-bold">{post.title}</h3>
                                <p>{post.content}</p>
                                <p className="text-sm text-gray-500">Автор: {post.author?.username}</p>
                            </li>
                        ))
                    ) : (
                        <p>Сообщений нет.</p>
                    )}
                </ul>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Назад
                </button>
                <span>
                    Страница {page} из {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default Forum;
