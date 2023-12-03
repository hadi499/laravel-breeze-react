import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

const CreatePost = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route("store"));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Post
                </h2>
            }
        >
            <Head title="Add Post" />
            <div className="w-[700px] mx-auto mt-10">
                <form className="flex flex-col gap-3" onSubmit={submit}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <label htmlFor="content">Content</label>
                    <textarea
                        name="content"
                        id="content"
                        cols="30"
                        rows="10"
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                    ></textarea>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />
                    <button
                        type="submit"
                        className="bg-slate-900 py-2 text-white w-1/3 rounded-lg hover:bg-slate-700"
                    >
                        Save
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreatePost;
