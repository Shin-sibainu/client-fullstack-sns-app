import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";
import { User } from "../../types";

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await apiClient.get(`/users/profile/${userId}`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>名前：{user.user.name}</h1>
      <p>Email: {user.email}</p>
      <p>自己紹介: {user.bio}</p>
    </div>
  );
};

export default UserProfile;
