import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Posts = ({ auth, posts }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My Posts
                </h2>
            }
        >
            <div className="w-[700px] mx-auto mt-10">
                {posts.map((post) => (
                    <div key={post.id} className="text-2xl font-semibold mb-4">
                        <img
                            src={`http://localhost:8000/storage/${post.image}`}
                            alt="image"
                            className="w-[200px] mb-2"
                        />
                        <Link
                            href={`/posts/${post.id}`}
                            className="hover:text-blue-500"
                        >
                            {post.title}
                        </Link>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default Posts;
