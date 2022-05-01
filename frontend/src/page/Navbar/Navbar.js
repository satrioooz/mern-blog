import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Toggle } from "../../Components/Config/Toggle";
import iTerms from "../../images/iterm.png";
import CloseNav from "../../Layout/Mobile/CloseNav";
import ListMobile from "../../Layout/Mobile/ListMobile";
import TogleNav from "../../Layout/Mobile/TogleNav";
import "./navbar.css";

const Navbar = () => {
  const [bar, setBar] = useState(false);
  return (
    <>
      <nav className="nav flex justify-between  w-full px-5  bg-white border-b border-gray-200 dark:border-gray-600 h-[60px] dark:bg-gray-800">
        <div className="flex items-center ">
          <img src={iTerms} className="w-[7%] mr-1" />
          <h1 className="items-center  text-[1.3rem] dark:text-white  font-bold">
            Blog co
          </h1>
        </div>

        <div
          className="hidden lg:absolute lg:right-[12%] lg:h-[60px] lg:mx-auto w-full md:block md:w-auto"
          id="mobile-menu"
        >
          <ul className="flex ] flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium mx-auto h-full items-center ">
            <li>
              <Link className="hover:text-blue-500 dark:text-white" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-500 dark:text-white" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-blue-500 dark:text-white"
                to="/register"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:absolute lg:right-[20px]">
          <Toggle />
        </div>
        <div class="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
          ></button>

          <div
            class={bar ? "mobile " : "lg:hidden sm:hidden md:hidden desktop"}
          >
            <ListMobile />
          </div>

          <button
            id="toggleSidebarMobile"
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="true"
            onClick={() => {
              console.log(bar);
              setBar(!bar);
            }}
          >
            {bar ? <TogleNav /> : <CloseNav />}
          </button>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
