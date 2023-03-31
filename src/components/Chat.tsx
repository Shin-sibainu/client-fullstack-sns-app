/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useState } from "react";

const Chat = () => {
  const [postText, setPostText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //投稿＆DBへ追加
    const newPost = await axios.post("/api/post");

    setPostText("");
  };

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
        <div className="bg-white shadow-md rounded p-4">
          {/* Replace this with fetched posts from API */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <img
                className="w-10 h-10 rounded-full mr-2"
                src="https://via.placeholder.com/150"
                alt="User Avatar"
              />
              <div>
                <h2 className="font-semibold text-md">User Name</h2>
                <p className="text-gray-500 text-sm">2 hours ago</p>
              </div>
            </div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              venenatis scelerisque.
            </p>
          </div>
          {/* End of the post */}
        </div>
      </main>
    </div>
  );
};

export default Chat;
