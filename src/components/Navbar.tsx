import Link from "next/link";
import React from "react";
import { useAuth } from "../../context/auth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/">SNS Clone</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <Link href="/">ホーム</Link>
                <button onClick={logout}>ログアウト</button>
              </>
            ) : (
              <>
                <Link href="/login">ログイン</Link>
                <Link href="/signup">サインアップ</Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
