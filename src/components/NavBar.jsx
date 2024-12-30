import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-8 relative">
      {/* Logo */}
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          MyApp
        </NavLink>
      </div>

      {/* Hamburger Icon for Small Devices */}
      <div className="md:hidden flex-none z-50">
        <button onClick={toggleMenu} className="btn btn-ghost">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-base-100 shadow-lg z-40 md:static md:flex md:items-center md:w-auto`}
      >
        <ul className="menu menu-vertical md:menu-horizontal p-4 md:p-0 md:gap-4 w-full md:w-auto">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/marathons"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Marathons
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : "text-base-content"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li tabIndex={0} className="dropdown dropdown-hover">
                <a className="btn btn-ghost avatar flex items-center">
                  <div className="w-8 rounded-full">
                    <img src="https://via.placeholder.com/150" alt="User Avatar" />
                  </div>
                </a>
                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <NavLink to="/profile" className="text-base-content">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-base-content"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : "text-base-content"
                  }
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "text-primary font-bold" : "text-base-content"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
