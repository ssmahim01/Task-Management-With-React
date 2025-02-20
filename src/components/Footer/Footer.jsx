import { FaGithub, FaHome, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { SiFacebook } from "react-icons/si";
import { Link, NavLink } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="flex md:flex-row flex-col justify-between bg-neutral-800 text-white/80 p-8 gap-5">
        <div className="md:w-2/5">
          <div className="flex flex-col gap-y-2">
            <a
              href="/"
              className="md:text-4xl p-0 text-3xl font-bold flex gap-0 mb-1"
            >
              <span>Task</span>
              <span className="text-indigo-600">Flow</span>
            </a>

            <p className=" text-sm font-semibold">
              TaskFlow offers a powerful yet simple way to manage your tasks.
              Add, edit, delete, and reorder tasks effortlessly, with real-time
              synchronization and a drag-and-drop interface. Organize your work
              into customizable lists and track your progress with ease.
            </p>

            <nav className="mt-2">
              <div className="flex gap-4 items-center *:hover:cursor-pointer">
                <Link
                  to="https://www.facebook.com/ssmahim"
                  target="_blank"
                  className="text-cyan-600 bg-gray-300 p-1 text-2xl rounded-full"
                >
                  <SiFacebook />
                </Link>

                <Link
                  to="https://www.instagram.com/iammz01"
                  target="_blank"
                  className="text-rose-500 bg-gray-300 p-1 text-2xl rounded-full"
                >
                  <FaInstagram />
                </Link>

                <Link
                  to="https://www.youtube.com/@MahimZayN"
                  target="_blank"
                  className="text-rose-500 bg-gray-300 p-1 text-2xl rounded-full"
                >
                  <FaYoutube />
                </Link>

                <Link
                  to="https://github.com/ssmahim01"
                  target="_blank"
                  className="text-gray-800 bg-gray-300 p-1 text-2xl rounded-full"
                >
                  <FaGithub />
                </Link>
              </div>
            </nav>
          </div>
        </div>

        <div className="md:w-2/5 space-y-3">
          <h3 className="text-3xl font-bold">Page Links</h3>
          <nav className="flex flex-col gap-y-4 *:font-semibold">
              <button className="btn btn-ghost w-1/5 hover:bg-neutral hover:text-white rounded-md justify-start">
            <NavLink to="/" className="flex gap-x-2">
                <FaHome className="text-lg" />{" "}
                <span>Home</span>
            </NavLink>
              </button>

              <button className="btn btn-ghost w-2/6 hover:bg-neutral hover:text-white rounded-md justify-start">
            <NavLink to="/add-tasks" className="flex gap-x-2">
                <IoMdAddCircle className="text-lg" />{" "}
                <span>Add Tasks</span>
            </NavLink>
              </button>

              <button className="btn btn-ghost w-2/6 hover:bg-neutral hover:text-white rounded-md justify-start">
            <NavLink to="/manage-tasks" className="flex gap-x-2">
                <MdMenuBook className="text-lg" />{" "}
                <span>Manage Tasks</span>
            </NavLink>
              </button>
          </nav>
        </div>
      </footer>

      <div className="py-3 w-full border-t border-gray-300 bg-neutral">
        <p className="text-white/80 font-medium text-center">
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <span className="font-bold">Task</span>
          <span className="text-indigo-600 font-bold">Flow</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
