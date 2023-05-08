/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../../lib/apiClient";
import { useAuth } from "../../context/auth";
import { Post } from "../types";
import PostComponent from "./PostComponent";

const Chat = () => {
  const { user } = useAuth();

  const [postText, setPostText] = useState<string>("");
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //投稿＆DBへ追加
    try {
      const newPost = await apiClient.post("/posts/post", {
        content: postText,
      });
      // console.log(newPost);
      setLatestPosts((prevPosts) => [newPost.data, ...prevPosts]);
      setPostText("");
    } catch (err) {
      alert("ログインしてください。");
    }

    setPostText("");
  };

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post");
        setLatestPosts(response.data);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPosts.map((post: Post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Chat;
