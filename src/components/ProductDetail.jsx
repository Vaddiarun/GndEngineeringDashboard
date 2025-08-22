// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { api } from "../api";
 
// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
 
//   useEffect(() => {
//     fetchProduct();
//   }, [id]);
 
//   const fetchProduct = async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
 
//   if (!product) return <div className="p-6">Loading...</div>;
 
//   const categories = [
//     "Hardware",
//     "Firmware",
//     "Testing",
//     "Mechanical",
//     "Certifications",
//     "Production"
//   ];
 
//   const goToCategoryTasks = (category) => {
//     navigate(`/products/${id}/tasks?category=${encodeURIComponent(category)}`);
//   };
 
//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//       <p className="text-gray-600 mb-6">{product.description}</p>
 
//       {/* Categories */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
//         {categories.map((cat) => (
//           <div
//             key={cat}
//             onClick={() => goToCategoryTasks(cat)}
//             className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-lg cursor-pointer text-center font-semibold hover:bg-blue-50 transition"
//           >
//             {cat}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
 
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import Navbar from "./Navbar";
 
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
 
  useEffect(() => {
    fetchProduct();
  }, [id]);
 
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };
 
  if (!product) return <div className="p-6">Loading...</div>;
 
  const categories = [
    "Hardware",
    "Firmware",
    "Testing",
    "Mechanical",
    "Certifications",
    "Production",
  ];
 
  const categoryIcons = {
    Hardware: "/hardware.png",
    Firmware: "/firmware.png",
    Testing: "/testing.png",
    Mechanical: "/mechanical.png",
    Certifications: "/certifications.png",
    Production: "/production.png",
  };
 
  const darkCategoryIcons = {
    Hardware: "/hardware-dark.png",
    Firmware: "/firmware-dark.png",
    Testing: "/testing-dark.png",
    Mechanical: "/mechanical-dark.png",
    Certifications: "/certifications-dark.png",
    Production: "/production-dark.png",
  };
 
  const goToCategoryTasks = (category) => {
    navigate(`/products/${id}/tasks?category=${encodeURIComponent(category)}`, {
      state: { productName: product.name }, // ✅ Pass the product name
    });
  };
 
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800">
      <Navbar
        title={product.name}
        subtitle={product.description}
        showHome
        showBack
      />
 
      {/* Categories */}
      <div className="m-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => goToCategoryTasks(cat)}
            className="bg-white dark:bg-slate-600 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow hover:shadow-lg cursor-pointer text-center font-semibold hover:bg-blue-50 transition flex flex-col items-center justify-center dark:hover:bg-slate-400 dark:text-white"
          >
            <img
              src={categoryIcons[cat]}
              alt={cat}
              className="w-14 h-14 mb-2 object-contain dark:hidden"
            />
            <img
              src={darkCategoryIcons[cat]}
              alt={cat}
              className="w-14 h-14 mb-2 object-contain hidden dark:block"
            />
 
            <span>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
 
 