import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../authentication/AuthProvider";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-8 relative overflow-hidden">
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
        } md:block absolute md:relative top-full md:top-0 left-0 w-full bg-base-100 shadow-lg md:shadow-none z-40 md:z-auto md:flex md:items-center md:w-auto`}
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
          {user ? (
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
              <li className="">
                <div className="avatar flex items-center">
                  <div className="w-8 rounded-full">
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/40"}
                      alt="User Profile"
                      className="h-10 w-10 rounded-full border-2 border-yellow-300"
                    />
                  </div>

                  <button
                      onClick={handleLogout}
                      className="text-base-content btn"
                    >
                      Logout
                    </button>
                </div>
                
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
                  onClick={() => setIsMenuOpen(false)}
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
