// import React, { useEffect, useState } from "react";
// import { api } from "../api";
// import ProductCard from "../components/ProductCard";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaTrash } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
 
// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     fetchProducts();
//   }, []);
 
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch products");
//     }
//   };
 
//   const addProduct = async () => {
//     if (!name) return toast.warning("Enter product name");
//     try {
//       await api.post("/products", { name, description });
//       setName("");
//       setDescription("");
//       toast.success("Product added successfully!");
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error adding product");
//     }
//   };
 
//   const deleteProduct = async (id) => {
//     try {
//       await api.delete(`/products/${id}`);
//       toast.success("Product deleted successfully!");
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting product");
//     }
//   };
 
//   const goToDetail = (id) => {
//     navigate(`/products/${id}`);
//   };
 
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     toast.info("Logged out");
//     navigate("/login");
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
 
//       {/* Sticky Header */}
//       <div className="sticky top-0 z-50 bg-white shadow-md p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//           Product Dashboard
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="mt-3 sm:mt-0 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 shadow transition-all"
//         >
//           Logout
//         </button>
//       </div>
 
//       <div className="p-4 sm:p-6 max-w-7xl mx-auto">
//         {/* Add Product Form */}
//         <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 flex flex-col sm:flex-row gap-3 items-center">
//           <input
//             type="text"
//             placeholder="Product Name"
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Description (optional)"
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <button
//             onClick={addProduct}
//             className="bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 justify-center hover:bg-blue-600 shadow transition-all"
//           >
//             <FaPlus /> Add
//           </button>
//         </div>
 
//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.map((p) => (
//             <div key={p._id} className="relative">
//               <ProductCard product={p} onClick={goToDetail} />
//               {/* Delete Button */}
//               <button
//                 onClick={() => deleteProduct(p._id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow"
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
 
// BEFORE
 
// import React, { useEffect, useState } from "react";
// import { api } from "../api";
// import ProductCard from "../components/ProductCard";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaTrash } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
 
// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     fetchProducts();
//   }, []);
 
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch products");
//     }
//   };
 
//   const addProduct = async () => {
//     if (!name) return toast.warning("Enter product name");
//     try {
//       await api.post("/products", { name, description });
//       setName("");
//       setDescription("");
//       toast.success("Product added successfully!");
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error adding product");
//     }
//   };
 
//   const deleteProduct = async (id) => {
//     try {
//       await api.delete(`/products/${id}`);
//       toast.success("Product deleted successfully!");
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error deleting product");
//     }
//   };
 
//   const goToDetail = (id) => {
//     navigate(`/products/${id}`);
//   };
 
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     toast.info("Logged out");
//     navigate("/login");
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
 
//       {/* Sticky Header */}
//       <div className="sticky top-0 z-50 bg-white shadow-md p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//           Product Dashboard
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="mt-3 sm:mt-0 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 shadow transition-all"
//         >
//           Logout
//         </button>
//       </div>
 
//       <div className="p-4 sm:p-6 max-w-7xl mx-auto">
//         {/* Add Product Form */}
//         <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 flex flex-col sm:flex-row gap-3 items-center">
//           <input
//             type="text"
//             placeholder="Product Name"
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Description (optional)"
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <button
//             onClick={addProduct}
//             className="bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 justify-center hover:bg-blue-600 shadow transition-all"
//           >
//             <FaPlus /> Add
//           </button>
//         </div>
 
//         {/* Products Grid */}
//         {products.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">
//             No products found. Please add products.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((p) => (
//               <div key={p._id} className="relative">
//                 <ProductCard product={p} onClick={goToDetail} />
//                 {/* Delete Button */}
//                 <button
//                   onClick={() => deleteProduct(p._id)}
//                   className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow"
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
 
// AFTER
 
import React, { useEffect, useState } from "react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMoon, FaSun } from "react-icons/fa";
 
export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };
 
  const addProduct = async () => {
    if (!name) return toast.warning("Enter product name");
    try {
      await api.post("/products", { name, description });
      setName("");
      setDescription("");
      setShowAddModal(false);
      toast.success("Product added successfully!");
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding product");
    }
  };
 
  const confirmDeleteProduct = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };
 
  const deleteProduct = async () => {
    try {
      await api.delete(`/products/${productToDelete}`);
      toast.success("Product deleted successfully!");
      setShowDeleteModal(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting product");
    }
  };
 
  const goToDetail = (id) => {
    navigate(`/products/${id}`);
  };
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out");
    navigate("/login");
  };
 
  const [isDark, setIsDark] = React.useState(false);
  const handleDarKmode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };
 
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
 
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center dark:bg-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          <span>Product Dashboard</span>
          <button
            onClick={handleDarKmode}
            className=" cursor-pointer ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-white
                 hover:scale-110 transition-all duration-300"
          >
            {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </h1>
 
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600  transition-all cursor-pointer  shadow-lg hover:shadow-blue-500/50"
          >
            <FaPlus /> Add Product
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer transition-all shadow-lg hover:shadow-red-500/50"
          >
            ➜] Logout
          </button>
        </div>
      </div>
 
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Products Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg ">
            No products found. Please add products.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {products.map((p) => (
              <div key={p._id} className=" relative">
                <ProductCard product={p} onClick={goToDetail} />
                {/* Delete Button */}
                <button
                  onClick={() => confirmDeleteProduct(p._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-700 dark:text-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-all cursor-pointer  shadow-lg hover:shadow-gray-500/50"
              >
                Cancel
              </button>
              <button
                onClick={addProduct}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all shadow-lg hover:shadow-blue-500/50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-700 dark:text-white rounded-xl shadow-lg w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={deleteProduct}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
 