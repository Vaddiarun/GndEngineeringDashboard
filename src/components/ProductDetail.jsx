
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
    "Production"
  ];

  const goToCategoryTasks = (category) => {
    navigate(
      `/products/${id}/tasks?category=${encodeURIComponent(category)}`,
      {
        state: { productName: product.name } // ✅ Pass the product name
      }
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => goToCategoryTasks(cat)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-lg cursor-pointer text-center font-semibold hover:bg-blue-50 transition"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}
