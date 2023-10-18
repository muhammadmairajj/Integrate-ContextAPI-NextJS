"use client";
import React, { useContext, useState } from "react";
import { PostContext } from "@/context/postContext";
import styles from "./posts.module.css";

function Posts() {
  const { posts, addPost, updatePost, deletePost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleAddPost = (event: any) => {
    event?.preventDefault();
    if (!title || !description) return;
    const newPost = {
      id: Date.now(),
      title: title,
      description: description,
    };

    addPost(newPost);
    setTitle("");
    setDescription("");
  };

  const handleDeletePost = (postId: any) => {
    deletePost(postId);
  };

  const editPost = (postId: any) => {
    const post = posts.filter((post: any) => post.id === postId)[0];
    console.log("post --> ", post);
    setTitle(post.title);
    setDescription(post.description);
    setPostId(postId);
    setIsEdit(true);
  };

  const handleEditPost = (event: any) => {
    event?.preventDefault();
    if (!title || !description) return;
    const updateExistsPost = {
      id: postId,
      title,
      description,
    };

    console.log(updateExistsPost.id, updateExistsPost);
    updatePost(updateExistsPost.id, updateExistsPost);

    setTitle("");
    setDescription("");
    setIsEdit(false);
  };
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className={styles.input}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className={styles.button}
          onClick={isEdit ? handleEditPost : handleAddPost}
        >
          {isEdit ? "Edit Post" : "Add New Post"}
        </button>
      </form>
      <h1 className={styles.heading}>Posts</h1>
      {posts ? (
        posts.map((post: any) => (
          <div key={post.id} className={styles.post}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>
            <button
              className={styles.editButton}
              onClick={() => editPost(post.id)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Posts;
