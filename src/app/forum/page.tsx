"use client"

import { useEffect, useState } from "react";
import ForumPost from "../../components/ForumPost";
import Link from "next/link";

const ForumPage: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:5000/api/forum?page=${page}&limit=10`);
            const data = await response.json();
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        };

        fetchPosts();
    }, [page]);

    const handleCreatePost = async () => {
        const response = await fetch("http://localhost:5000/api/forum/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            const newPost = await response.json();
            setPosts([newPost, ...posts]); // Добавляем новый пост в начало списка
            setIsCreatingPost(false); // Закрываем форму
            setTitle(""); // Очищаем поля
            setContent("");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Форум</h1>
            {posts.map((post) => (
                <ForumPost key={post._id} post={post} />
            ))}
            <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`mx-1 px-3 py-1 rounded-lg ${
                            page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Форма для создания поста */}
            <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg w-96">
                <button
                    onClick={() => setIsCreatingPost(!isCreatingPost)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600"
                >
                    {isCreatingPost ? "Закрыть" : "Создать пост"}
                </button>
                {isCreatingPost && (
                    <div className="mt-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Заголовок"
                            className="w-full p-2 border rounded-lg mb-2"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Содержание"
                            className="w-full p-2 border rounded-lg mb-2"
                        />
                        <button
                            onClick={handleCreatePost}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
                        >
                            Опубликовать
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumPage;