// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUserAlt, FaLock } from "react-icons/fa";
// import { toast } from "react-toastify"; // ✅ import toast
// import "react-toastify/dist/ReactToastify.css"; // ✅ import toast styles
 
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://gndproductbackend-1.onrender.com/api/auth/login", {
//         email,
//         password,
//       });
 
//       // Save token to localStorage
//       localStorage.setItem("token", res.data.token);
 
//       // Show success toast
//       toast.success("Login successful!");
 
//       // Redirect to home
//       navigate("/");
//     } catch (err) {
//       // Show error toast instead of alert
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Welcome Back
//         </h2>
 
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div className="relative">
//             <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               required
//             />
//           </div>
 
//           {/* Password */}
//           <div className="relative">
//             <FaLock className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               required
//             />
//           </div>
 
//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-shadow shadow-md hover:shadow-lg"
//           >
//             Login
//           </button>
//         </form>
 
//         <p className="text-center text-gray-500 mt-6 text-sm">
//           Dont have an account?{" "}
//           <span
//             className="text-blue-500 hover:underline cursor-pointer"
//             onClick={() => navigate("/register")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
 
// export default Login;
 
//PREV NEW WORKING BEFORE
 
// import Particles from "react-tsparticles";
 
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaUserAlt,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaNetworkWired,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
 
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "https://gndproductbackend-1.onrender.com/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );
 
//       localStorage.setItem("token", res.data.token);
 
//       // toast.success("Login successful! Connecting to IoT platform...");
 
//       try {
//         await axios.get(`/api/iot/status`, {
//           headers: { Authorization: `Bearer ${res.data.token}` },
//         });
//         toast.success("Successfully connected to IoT network");
//       } catch (err) {
//         console.error("IoT Error:", err);
//         if (err.response) {
//           toast.warning(
//             `IoT Connection Error: ${
//               err.response.data.message || err.response.statusText
//             }`
//           );
//         } else if (err.request) {
//           toast.warning("Network error connecting to IoT network");
//         } else {
//           toast.warning(`IoT Error: ${err.message}`);
//         }
//       }
 
//       navigate("/");
//     } catch (err) {
//       console.error("Login Error:", err);
//       if (err.response?.status === 401) {
//         toast.error("Invalid credentials");
//       } else if (err.response?.status === 404) {
//         toast.error("Organization or user not found");
//       } else if (err.response) {
//         toast.error(
//           err.response.data.message || "An error occurred during login"
//         );
//       } else if (err.request) {
//         toast.error("Network error - Please check your connection");
//       } else {
//         toast.error(`Error: ${err.message}`);
//       }
//     }
//   };
 
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
 
//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-blue-400 to-slate-800 animate-gradient bg-[length:400%_400%]" />
 
//       {/* Particles */}
//       <Particles
//         className="absolute inset-0"
//         options={{
//           background: { color: "transparent" },
//           particles: {
//             color: { value: ["#60a5fa", "#1e293b"] }, // blue-400 & slate-800
//             move: { enable: true, speed: 0.5, random: true },
//             opacity: {
//               value: { min: 0, max: 0.5 },
//               animation: { enable: true, speed: 1, minimumValue: 0 },
//             },
//             size: {
//               value: { min: 50, max: 150 },
//               animation: { enable: true, speed: 5, minimumValue: 20 },
//             },
//             number: { value: 6 }, // few big glow particles
//             shape: { type: "circle" },
//             blur: { enable: true },
//           },
//         }}
//       />
 
//       {/* Content */}
//       <div className="relative z-10 bg-slate-800 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-slate-700">
//         <div className="bg-slate-800 shadow-2xl rounded-2xl w-full max-w-md p-8 border border-slate-700">
//           <div className="flex items-center justify-center mb-6">
//             <FaNetworkWired className="text-4xl text-blue-400 mr-2" />
//             <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
//           </div>
 
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 required
//               />
//             </div>
 
//             <div className="relative">
//               <FaLock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-3 top-3 text-gray-400"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
 
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/50"
//             >
//               Connect to Platform
//             </button>
//           </form>
 
//           <p className="text-center text-gray-400 mt-6 text-sm">
//             Need an organization account?{" "}
//             <span
//               className="text-blue-400 hover:underline cursor-pointer"
//               onClick={() => navigate("/register")}
//             >
//               Register Organization
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
 
// export default Login;
 
//NEW AFTER
 
// import Particles from "react-tsparticles";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
 
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "https://gndproductbackend-1.onrender.com/api/auth/login",
//         { email, password }
//       );
 
//       localStorage.setItem("token", res.data.token);
 
//       try {
//         await axios.get(`/api/iot/status`, {
//           headers: { Authorization: `Bearer ${res.data.token}` },
//         });
//         toast.success("Successfully connected to IoT network");
//       } catch (err) {
//         if (err.response) {
//           toast.warning(
//             `IoT Connection Error: ${
//               err.response.data.message || err.response.statusText
//             }`
//           );
//         } else if (err.request) {
//           toast.warning("Network error connecting to IoT network");
//         } else {
//           toast.warning(`IoT Error: ${err.message}`);
//         }
//       }
 
//       navigate("/");
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error("Invalid credentials");
//       } else if (err.response?.status === 404) {
//         toast.error("Organization or user not found");
//       } else if (err.response) {
//         toast.error(
//           err.response.data.message || "An error occurred during login"
//         );
//       } else if (err.request) {
//         toast.error("Network error - Please check your connection");
//       } else {
//         toast.error(`Error: ${err.message}`);
//       }
//     }
//   };
 
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
 
//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#3054E5] to-[#02207E] animate-gradient bg-[length:400%_400%]" />
 
//       {/* Particle Overlay */}
//       <Particles
//         className="absolute inset-0"
//         options={{
//           background: { color: "transparent" },
//           fpsLimit: 60,
//           particles: {
//             color: { value: ["#3054E5", "#02207E"] },
//             move: { enable: true, speed: 1, random: false, straight: false },
//             opacity: {
//               value: 0.4,
//               animation: { enable: true, speed: 1, minimumValue: 0.2 },
//             },
//             size: {
//               value: { min: 2, max: 5 }, // 👈 smaller dots
//               animation: { enable: true, speed: 4, minimumValue: 1 },
//             },
//             number: { value: 80, density: { enable: true, area: 800 } }, // 👈 more particles
//             links: {
//               enable: true,
//               color: "#3054E5",
//               distance: 120,
//               opacity: 0.3,
//               width: 1,
//             },
//           },
//           detectRetina: true,
//         }}
//       />
 
//       {/* Glassmorphism Card */}
//       <div className="relative z-10 w-full max-w-md">
//         <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
//           {/* Header */}
//           <div className="flex flex-col items-center mb-6 text-center">
//             <img
//               src="/GND_Logo.png"
//               alt="App Logo"
//               className="w-16 h-16 mb-3 object-contain"
//             />
//             <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
//             <p className="text-gray-300 text-sm">
//               Sign in to access your IoT platform
//             </p>
//           </div>
 
//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div className="relative">
//               <FaUserAlt className="absolute left-3 top-3.5 text-gray-400" />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full bg-slate-900/60 border border-slate-600 text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
//                 required
//               />
//             </div>
 
//             {/* Password */}
//             <div className="relative">
//               <FaLock className="absolute left-3 top-3.5 text-gray-400" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-slate-900/60 border border-slate-600 text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute mt-0.5 right-3 top-3.5 text-gray-400 hover:text-blue-400 transition"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
 
//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 cursor-pointer"
//             >
//               Connect to Platform
//             </button>
//           </form>
 
//           {/* Footer */}
//           <p className="text-center text-gray-400 mt-6 text-sm">
//             Need an organization account?{" "}
//             <span
//               className="text-blue-400 hover:underline cursor-pointer"
//               onClick={() => navigate("/register")}
//             >
//               Register Organization
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
 
// export default Login;
 
// NEW ANOTHER LATEST WITH LOGIN FAST
 
import Particles from "react-tsparticles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 new state
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    try {
      const res = await axios.post(
        "https://gndproductbackend-1.onrender.com/api/auth/login",
        { email, password }
      );
 
      localStorage.setItem("token", res.data.token);
      navigate("/"); // redirect right away
 
      // ✅ Run IoT check ONCE
      try {
        const iotRes = await axios.get(`/api/iot/status`, {
          headers: { Authorization: `Bearer ${res.data.token}` },
        });
 
        if (iotRes.status === 200) {
          toast.success("Successfully connected to IoT network");
        }
      } catch (err) {
        if (err.response) {
          toast.warning(
            `IoT Connection Error: ${
              err.response.data.message || err.response.statusText
            }`
          );
        } else if (err.request) {
          toast.warning("Network error connecting to IoT network");
        } else {
          toast.warning(`IoT Error: ${err.message}`);
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid credentials");
      } else if (err.response?.status === 404) {
        toast.error("Organization or user not found");
      } else if (err.response) {
        toast.error(
          err.response.data.message || "An error occurred during login"
        );
      } else if (err.request) {
        toast.error("Network error - Please check your connection");
      } else {
        toast.error(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
 
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
 
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3054E5] to-[#02207E] animate-gradient bg-[length:400%_400%]" />
 
      {/* Particle Overlay */}
      <Particles
        className="absolute inset-0"
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: ["#3054E5", "#02207E"] },
            move: { enable: true, speed: 1 },
            opacity: {
              value: 0.4,
              animation: { enable: true, speed: 1, minimumValue: 0.2 },
            },
            size: {
              value: { min: 2, max: 5 },
              animation: { enable: true, speed: 4, minimumValue: 1 },
            },
            number: { value: 80, density: { enable: true, area: 800 } },
            links: {
              enable: true,
              color: "#3054E5",
              distance: 120,
              opacity: 0.3,
              width: 1,
            },
          },
          detectRetina: true,
        }}
      />
 
      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-6 text-center">
            <img
              src="/GND_Logo.png"
              alt="App Logo"
              className="w-16 h-16 mb-3 object-contain"
            />
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-300 text-sm">
              Sign in to access your IoT platform
            </p>
          </div>
 
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-600 text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
                required
              />
            </div>
 
            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-600 text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute mt-0.5 right-3 top-3.5 text-gray-400 hover:text-blue-400 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
 
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 cursor-pointer ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Connect to Platform"
              )}
            </button>
          </form>
 
          {/* Footer */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Need an organization account?{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register Organization
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
 
export default Login;
 
 