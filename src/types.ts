export interface Profile {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: String;
  posts: Post[];
  profile: Profile;
}

export interface Post {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: User; // User型のauthorプロパティを追加
}
