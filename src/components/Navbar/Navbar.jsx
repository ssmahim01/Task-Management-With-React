import { BiSolidLogInCircle, BiSolidLogOutCircle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle Toggle Of Light & Dark
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogOut = () => {
    logOutUser().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Log out successful",
        showConfirmButton: false,
        timer: 3000,
      });
    });
  };

  const routes = (
    <>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        to="/"
      >
        <FaHome className="text-xl" /> <span>Home</span>
      </NavLink>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        to="/add-task"
      >
        <IoMdAddCircle className="text-xl" /> <span>Add Task</span>
      </NavLink>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        to="/manage-tasks"
      >
        <MdMenuBook className="text-xl" /> <span>Manage Tasks</span>
      </NavLink>
    </>
  );

  return (
    <div
      className={`navbar ${
        theme === "light"
          ? "text-neutral-700 bg-neutral-200"
          : "text-neutral-200 bg-neutral-800"
      } py-2  border-b border-neutral-200 fixed z-10 shadow-sm lg:px-12 md:px-6 px-4`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn border border-neutral-300 btn-ghost lg:hidden mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100/90 rounded-box z-[10] mt-3 w-60 p-3 shadow gap-3 mr-3 *:font-semibold"
          >
            {routes}
          </ul>
        </div>
        <div className="flex gap-1 items-center">
          <img
            src="favicon.ico"
            className="w-10 h-10 rounded-md"
            referrerPolicy="no-referrer"
            alt="Logo of task flow"
          />
          <a
            href="/"
            className="btn btn-ghost lg:text-3xl text-xl p-2 md:flex gap-0 items-center font-bold hidden"
          >
            <span>Task</span> <span className="text-indigo-600">Flow</span>
          </a>
        </div>
      </div>

      <div className="navbar-end w-full">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-3 mr-3 *:font-semibold px-1">
            {routes}
          </ul>
        </div>

        <div className="">
          <ThemeToggle theme={theme} handleToggleTheme={handleToggleTheme} />
        </div>

        {user ? (
          <div className="flex gap-2 items-center">
            <figure className="w-12 h-12 avatar avatar-online">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-full h-full border-4 border-indigo-500 rounded-full"
                referrerPolicy="no-referrer"
              />
            </figure>

            <button
              onClick={handleLogOut}
              className="bg-rose-500 cursor-pointer py-2 px-5 text-white hover:bg-rose-700 rounded-md font-bold flex gap-1 items-center"
            >
              <BiSolidLogOutCircle className="text-2xl" />
              <span className="text-base">Log Out</span>
            </button>
          </div>
        ) : (
          <>
            <button className="bg-indigo-500 py-2 px-5 text-white hover:bg-indigo-700 rounded-md font-bold">
              <Link to="/login" className="flex gap-1 items-center">
                <span className="text-base">Login</span>
                <BiSolidLogInCircle className="text-xl" />
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
