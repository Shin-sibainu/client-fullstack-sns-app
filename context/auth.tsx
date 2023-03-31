import { useContext, useState, useEffect, Provider, ReactNode } from "react";
import React from "react";
import apiClient from "../lib/apiClient";

interface AuthContextType {
  user: null | {
    id: number;
    name: string;
    email: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

//ローカルストレージの有無によって権限あるかどうかを確かめるプロバイダ
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    name: string;
    email: string;
  }>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    //トークンがあったら＝認証済みだったら
    if (token) {
      //AuthorizationヘッダにBearerトークンをセットする。
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      // トークンが存在する場合、ユーザー情報を取得して状態にセットする
      apiClient
        .get("/user/find")
        .then((res: any) => {
          setUser(res.data.user);
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
