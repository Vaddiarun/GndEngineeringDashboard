
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { toast } from "react-toastify"; // ✅ import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ import toast styles

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://gndproductbackend-1.onrender.com/api/auth/login", {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      // Show success toast
      toast.success("Login successful!");

      // Redirect to home
      navigate("/");
    } catch (err) {
      // Show error toast instead of alert
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-shadow shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Dont have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
