// User型は既に定義されていることを想定しています。例えば：
export interface User {
  id: number;
  name: string;
  email: string;
  password: String;
  posts: Post[];
  bio: string;
  user: any;
}

export interface Post {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: User; // User型のauthorプロパティを追加
}
