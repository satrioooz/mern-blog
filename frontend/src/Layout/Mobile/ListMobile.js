import React from "react";
import { Link } from "react-router-dom";

const ListMobile = () => {
  return (
    <div className="bg-primary dark:bg-darkCol w-full h-full flex justify-center items-center text-center font-bold text-[1.3rem]">
      <ul
        className="py-1 bg-primary dark:bg-darkCol"
        aria-labelledby="dropdown"
      >
        <li>
          <Link
            to="/"
            className="block py-2 px-4 text-lg text-[#6A7281]  hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-[#9CA3AF] dark:hover:text-white"
          >
            Dashboard
          </Link>
        </li>

        {/* LOGIN */}
        <li>
          <Link
            to="/login"
            className="block py-2 px-4 text-lg text-[#6A7281]  hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-[#9CA3AF] dark:hover:text-white"
          >
            Login
          </Link>
        </li>

        {/* ==== REGISTER ==== */}
        <li>
          <Link
            to="/register"
            className="block py-2 px-4 text-lg text-[#6A7281] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-[#9CA3AF] dark:hover:text-white"
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ListMobile;
