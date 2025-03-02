import Image from "next/image";

interface CommentProps {
    comment: {
        _id: string;
        content: string;
        author: {
            username: string;
            avatar: string;
        };
        images?: string[];
        createdAt: string;
    };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-2">
                <Image
                    src={comment.author.avatar || "/default-avatar.png"}
                    alt={comment.author.username}
                    width={30}
                    height={30}
                    className="rounded-full"
                />
                <div className="ml-2">
                    <p className="font-semibold">{comment.author.username}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <p className="text-gray-700">{comment.content}</p>
            {comment.images && (
                <div className="flex gap-2 mt-2">
                    {comment.images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`Comment image ${index + 1}`}
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;