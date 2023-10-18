"use client";

import { createContext, useState } from "react";

export const PostContext = createContext<any>(null);


const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState([
        {id: 1, title: "Title 1", description: "This is Description 1"},
        {id: 2, title: "Title 2", description: "This is Description 2"},
    ]);

    const addPost = (newPost: any) => {
        setPosts([...posts, newPost]);
    }

    const updatePost = (id: number, updatePost: any) => {
       setPosts((prevPost) => {
        return prevPost.map((post) => {
            if(post.id === id) {
                return { ...post, ...updatePost }
            } else {
                return post;
            }
        })
       })
    }

    const deletePost = (id: any) => {
        const postId = posts.filter((post: any) => post.id !== id);
        setPosts(postId);
    }

    return (
        <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
            {children}
        </PostContext.Provider>
    )
};

export default PostContextProvider;