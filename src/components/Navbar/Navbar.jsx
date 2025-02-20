import { BiSolidLogInCircle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const routes = (
    <>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        href={"/"}
      >
        <FaHome className="text-xl" /> <span>Home</span>
      </NavLink>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        href="/add-task"
      >
        <IoMdAddCircle className="text-xl" /> <span>Add Task</span>
      </NavLink>
      <NavLink
        className="border border-neutral-300 hover:bg-neutral hover:text-white rounded-md px-4 py-2 flex gap-2 items-center"
        href="/manage-tasks"
      >
        <MdMenuBook className="text-xl" /> <span>Manage Tasks</span>
      </NavLink>
    </>
  );

  return (
    <div className="navbar py-2 bg-neutral-200 border-b border-neutral-200 fixed z-10 shadow-sm lg:px-12 md:px-6 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-60 p-3 shadow gap-3 mr-3 *:text-neutral-800 *:font-semibold"
          >
            {routes}
          </ul>
        </div>
        <a
          href="/"
          className="btn btn-ghost lg:text-3xl text-xl lg:pb-0 pb-1 flex gap-0 items-center font-bold"
        >
          <span>Task</span> <span className="text-indigo-600">Flow</span>
        </a>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-3 mr-3 *:text-neutral-800 *:font-semibold px-1">
            {routes}
          </ul>
        </div>

        <button className="bg-indigo-500 py-2 px-4 text-white hover:bg-indigo-700 rounded-md font-bold">
          <Link to="/login" className="flex gap-2 items-center">
            <span className="text-base">Login</span>
            <BiSolidLogInCircle className="text-xl" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
