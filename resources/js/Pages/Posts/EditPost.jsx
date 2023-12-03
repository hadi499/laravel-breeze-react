import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Head, router } from "@inertiajs/react";

const EditPost = ({ auth, post }) => {
    const { data, setData, errors } = useForm({
        title: post.title,
        content: post.content,
        oldImage: post.image,
        image: null,
    });
    // const loadImage = (e) => {
    //     const image = e.target.files[0];
    //     console.log(image);
    //     setData("image", image);
    // };

    function submit(e) {
        e.preventDefault();
        console.log(data);
        const data1 = {
            _method: "put",
            title: data.title,
            content: data.content,
            oldImage: data.oldImage,
            image: data.image,
        };
        const data2 = {
            _method: "put",
            title: data.title,
            content: data.content,
            oldImage: data.oldImage,
        };

        const reqData = data.image == null ? data2 : data1;
        router.post(`/posts/${post.id}/edit`, reqData);
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
                    {errors.title}
                    <label htmlFor="content">Content</label>
                    <textarea
                        name="content"
                        id="content"
                        cols="30"
                        rows="10"
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                    ></textarea>
                    <input type="hidden" value={data.oldImage} />
                    <label htmlFor="image">Image</label>

                    <input
                        type="file"
                        id="image"
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

export default EditPost;
