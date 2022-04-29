import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex px-3 items-center justify-between w-full h-[50px] bg-slate-300">
        <h1 className="items-center font-bold">Blog co</h1>
        <ul className="flex gap-3 items-center justify-between">
          <li>
            <Link className="hover:text-blue-500" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" to="/">
              Login
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
