import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/">SNS Clone</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/login"
                className="hover:bg-green-700 hover:text-white duration-200 bg-white text-gray-700 font-semibold py-2 px-4 rounded"
              >
                ログイン
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="hover:bg-green-700 hover:text-white duration-200 bg-white text-gray-700 font-semibold py-2 px-4 rounded"
              >
                プロフィール
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
