import Link from "next/link";
import Image from "next/image";

interface ForumPostProps {
    post: {
        _id: string;
        title: string;
        content: string;
        author: {
            username: string;
            avatar: string;
        };
        images?: string[];
        rating: number;
        comments: any[];
        createdAt: string;
    };
}

const ForumPost: React.FC<ForumPostProps> = ({ post }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
                <Image
                    src={post.author.avatar || "/default-avatar.png"}
                    alt={post.author.username}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="ml-4">
                    <p className="font-semibold">{post.author.username}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.images && (
                <div className="flex gap-2 mb-4">
                    {post.images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`Post image ${index + 1}`}
                            width={200}
                            height={200}
                            className="rounded-lg"
                        />
                    ))}
                </div>
            )}
            <div className="flex items-center justify-between">
                <p className="text-gray-500">Рейтинг: {post.rating}</p>
                <Link href={`/forum/${post._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Обсудить
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ForumPost;