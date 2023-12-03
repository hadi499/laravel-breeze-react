import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

const Post = ({ auth, post }) => {
    const { delete: destroy } = useForm({});
    const deletePost = async (id) => {
        const confirmed = window.confirm("Are yo sure?");
        if (confirmed) {
            destroy(`/posts/${id}/delete`);
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Post
                </h2>
            }
        >
            <div className="w-1/3 mx-auto mt-10 ">
                <img
                    src={`http://localhost:8000/storage/${post.image}`}
                    alt=""
                />
                <h1 className="text-3xl text-slate-900 my-2">{post.title}</h1>
                <p className="text-lg text-slate-700">{post.content}</p>
                <div className="mt-6 flex gap-4 ">
                    <Link href={`/posts/${post.id}/edit`}>
                        <button className="px-2 py-1 bg-blue-700 text-white hover:opacity-80 rounded-sm">
                            edit
                        </button>
                    </Link>
                    <button
                        onClick={() => deletePost(post.id)}
                        className="px-2 py-1 bg-red-600 rounded-sm text-white hover:opacity-80"
                    >
                        delete
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Post;
