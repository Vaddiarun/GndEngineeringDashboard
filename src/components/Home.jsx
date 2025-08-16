
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
import React, { useEffect, useState } from "react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
      toast.success("Product added successfully!");
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully!");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Product Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="mt-3 sm:mt-0 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 shadow transition-all"
        >
          Logout
        </button>
      </div>

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Add Product Form */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Product Name"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 justify-center hover:bg-blue-600 shadow transition-all"
          >
            <FaPlus /> Add
          </button>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products found. Please add products.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p._id} className="relative">
                <ProductCard product={p} onClick={goToDetail} />
                {/* Delete Button */}
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
