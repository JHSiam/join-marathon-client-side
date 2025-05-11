import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import { FaPlus, FaList, FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <HelmetProvider>
        <Helmet>
          <title>Dashboard - Join Marathon</title>
        </Helmet>
      </HelmetProvider>

      {/* Sidebar */}
      <aside className="bg-blue-300 text-white flex flex-col w-full lg:w-64 transition-all duration-300 ease-in-out">
        <div className="text-2xl font-bold p-4 border-b border-gray-700">
          Marathon Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            {/* Add Marathon */}
            <li>
              <NavLink
                to="add-marathon"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaPlus className="mr-2" />
                <span>Add Marathon</span>
              </NavLink>
            </li>

            {/* My Marathon List */}
            <li>
              <NavLink
                to="my-marathon-list"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaList className="mr-2" />
                <span>My Marathon List</span>
              </NavLink>
            </li>

            {/* My Apply List */}
            <li>
              <NavLink
                to="my-apply-list"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-primary"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                <FaClipboardList className="mr-2" />
                <span>My Apply List</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
