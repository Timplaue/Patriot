"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ForumPost from "../../components/ForumPost";
import Comment from "../../components/Comment";

const PostPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<any>(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const response = await fetch(`/api/forum/${id}`);
                const data = await response.json();
                setPost(data);
            };

            fetchPost();
        }
    }, [id]);

    const handleCommentSubmit = async () => {
        const response = await fetch(`/api/forum/${id}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ content: comment }),
        });

        if (response.ok) {
            setComment("");
            router.reload(); // Обновляем страницу для отображения нового комментария
        }
    };

    if (!post) return <div>Загрузка...</div>;

    return (
        <div className="container mx-auto p-4">
            <ForumPost post={post} />
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Комментарии</h2>
                {post.comments.map((comment: any) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
                <div className="mt-6">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Напишите комментарий..."
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
                    >
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostPage;