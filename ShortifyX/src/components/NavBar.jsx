import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";


const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
  <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          ShortifyX
        </h1>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden sm:flex items-center gap-8">
        <Link
          to="/"
          className={`text-sm font-medium ${
            path === "/"
              ? "text-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Home
        </Link>

        <Link
          to="/about"
          className={`text-sm font-medium ${
            path === "/about"
              ? "text-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          About
        </Link>

        {token && (
          <Link
            to="/dashboard"
            className={`text-sm font-medium ${
              path === "/dashboard"
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Dashboard
          </Link>
        )}

        {!token && (
          <Link to="/register">
            <button className="cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
              Get Started
            </button>
          </Link>
        )}

        {token && (
          <button
            onClick={onLogOutHandler}
            className="cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
          >
            LogOut
          </button>
        )}
      </nav>

      {/* Mobile Toggle */}
      <button
        onClick={() => setNavbarOpen(!navbarOpen)}
        className="sm:hidden text-3xl text-gray-800"
      >
        {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
      </button>
    </div>

    {/* Mobile Menu */}
    <div
      className={`sm:hidden transition-all duration-300 overflow-hidden ${
        navbarOpen ? "max-h-60" : "max-h-0"
      } bg-white border-t`}
    >
      <div className="flex flex-col px-6 py-4 gap-4">
        <Link to="/" onClick={() => setNavbarOpen(false)}>
          Home
        </Link>

        <Link to="/about" onClick={() => setNavbarOpen(false)}>
          About
        </Link>

        {token && (
          <Link to="/dashboard" onClick={() => setNavbarOpen(false)}>
            Dashboard
          </Link>
        )}

        {!token && (
          <Link to="/register" onClick={() => setNavbarOpen(false)}>
            <button className="w-full cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
              Get Started
            </button>
          </Link>
        )}

        {token && (
          <button
            onClick={() => {
              onLogOutHandler();
              setNavbarOpen(false);
            }}
            className="w-full cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            LogOut
          </button>
        )}
      </div>
    </div>
  </header>
);
};

export default Navbar;