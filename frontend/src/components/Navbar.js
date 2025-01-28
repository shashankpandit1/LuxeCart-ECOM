import React, { useState } from "react";
import logo from "../assets/logo3.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="top-0 flex items-center justify-between bg-white shadow-md h-18">
      <div className="flex p-1 mt-1 ml-5">
        <Link to="/">
          <img src={logo} alt="LOGO" className="w-40 h-14" />
        </Link>
      </div>

      <button
        className="block md:hidden mr-5 text-gray-800 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5"
          />
        </svg>
      </button>

      {/* Full Navbar for larger screens */}
      <nav className="hidden md:flex items-center mr-5 space-x-6 text-black eyesome">
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <div
          className="flex items-center px-3 rounded-full"
          style={{
            backgroundColor: "#ebebeb",
            height: "40px",
            width: "200px",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 text-sm bg-transparent border-none outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <Link to="/wishlist">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </Link>
        <Link to="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </Link>
        <Link to="/admin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </nav>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-md z-10 md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 eyesome">
            <li>
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={() => setIsMenuOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
