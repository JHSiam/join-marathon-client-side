import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from './AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
//import { Helmet } from 'react-helmet';

export default function Login() {
  const { userLogin, setUser, logInWithGoogle } = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success('Logged in successfully', {
          position: "top-center",
        });

        // Delay navigation to allow toast to display
        setTimeout(() => {
            navigate(location?.state ? location.state : "/");
        }, 2000); // 2-second delay
      })
      .catch((err) => {
        toast.error(`Login failed: ${err.message}`, {
          position: "top-center",
        });
      });
  };

  function handleGoogleLogin() {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success('Logged in successfully with Google', {
          position: "top-center",
        });

        // Delay navigation to allow toast to display
        setTimeout(() => {
            navigate(location?.state ? location.state : "/");
        }, 2000); // 2-second delay
      })
      .catch((err) => {
        toast.error(`Google login failed: ${err.message}`, {
          position: "top-center",
        });
      });
  }

  return (
    <div className="min-h-screen  flex items-center justify-center">
       <HelmetProvider><Helmet><title>Login - Join Marahton</title></Helmet></HelmetProvider>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Forget Password */}
          <div className="mb-4 text-right">
            <Link
              to={`/forgot-password/${emailInput}`}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-light w-full py-2 px-4 rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700">
            Login
          </button>
        </form>

        {/* Social Login */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          className="btn btn-outline w-full flex items-center justify-center space-x-2"
          type="button"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="text-lg" />
          <span>Login with Google</span>
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}