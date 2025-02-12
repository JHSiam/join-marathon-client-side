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
    <nav className="navbar shadow-md px-6 md:px-8 relative flex justify-between bg-blue-300 w-full mx-auto">
      {/* Logo */}
      <div className="">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          Join Marathon
        </NavLink>

        
      </div>

      {/* Hamburger Menu for Small Devices */}
      <div className="md:hidden">
          <button onClick={toggleMenu} className="btn btn-ghost">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

      {/* Small & Medium Devices Menu */}
      {isMenuOpen && (
        <ul className="menu menu-vertical bg-base-100 shadow-lg p-4 absolute top-full left-0 w-full z-40 md:hidden">
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

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
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
              <li>
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={user?.photoURL || "https://via.placeholder.com/40"}
                        alt="User Profile"
                        className="rounded-full border-2 border-yellow-300"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline btn-sm"
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
      )}

      {/* Large Devices Menu */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-base-content"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/marathons"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-base-content"
          }
        >
          Marathons
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "text-base-content"
          }
        >
          About
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
              }
            >
              Dashboard
            </NavLink>
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt="User Profile"
                    className="rounded-full border-2 border-yellow-300"
                  />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm text-base-content"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "text-base-content"
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
