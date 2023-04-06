import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";
import { Post, User } from "../../types";
import PostComponent from "../../components/PostComponent";
import { GetServerSideProps } from "next";

interface ProfileProps {
  userId: string;
  profile: any;
  posts: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;

  try {
    const [profileRes, postsRes] = await Promise.all([
      apiClient.get(`/users/profile/${userId}`), //bioデータ等
      apiClient.get(`/posts/${userId}`), //そのユーザーが投稿しているpost内容のみ
    ]);
    return {
      props: {
        userId,
        profile: profileRes.data,
        posts: postsRes.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

const UserProfile: React.FC<ProfileProps> = ({ userId, profile, posts }) => {
  const [user, setUser] = useState<User>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <img
              className="w-20 h-20 rounded-full mr-4"
              src={profile.profileImageUrl}
              alt="User Avatar"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {profile.user.name}
              </h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>
        {posts.map((post: Post) => (
          <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={profile.profileImageUrl}
                  alt="User Avatar"
                />
                <div>
                  <h2 className="font-semibold text-md">{post.author.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
