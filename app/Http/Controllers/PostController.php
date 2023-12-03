<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->get();
        return Inertia::render(
            'Posts/Posts',
            [
                'posts' => $posts
            ]
        );
    }
    public function show(Post $post)
    {

        return Inertia::render('Posts/Post', [
            'post' => $post
        ]);
    }

    public function create()
    {
        return Inertia::render('Posts/CreatePost');
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'image' => 'image|file|max:1024|nullable',
        ]);
        if ($request->file('image')) {
            $validatedData['image'] = $request->file('image')->store('post-images');
        }

        Post::create($validatedData);
        return redirect('/posts');
    }
    public function edit(Post $post)
    {
        return Inertia::render('Posts/EditPost', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        //set validation
        $rules = [
            'title' => 'required|max:255',
            'content' => 'required',
            'image' => 'image|file|max:1024|nullable',
        ];



        $validatedData = $request->validate($rules);
        if ($request->file('image')) {
            if ($request->oldImage) {
                Storage::delete($request->oldImage);
            }
            $validatedData['image'] = $request->file('image')->store('post-images');
        }


        //update post
        Post::where('id', $post->id)
            ->update($validatedData);

        //redirect
        return redirect('/posts');
    }

    public function destroy(Post $post)
    {
        if ($post->image) {
            Storage::delete($post->image);
        }
        Post::destroy($post->id);
        return redirect('/posts');
    }
}
