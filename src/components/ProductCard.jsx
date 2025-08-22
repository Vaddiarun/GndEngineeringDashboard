// import React from "react";
// import { FaBoxOpen } from "react-icons/fa"; // icon for product
 
// export default function ProductCard({ product, onClick }) {
 
//   return (
//     <div
//       className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-5 flex flex-col justify-between"
//       onClick={() => onClick(product._id)}
//     >
//       {/* Icon */}
//       <div className="flex items-center justify-center mb-4 text-blue-500">
//         <FaBoxOpen size={32} />
//       </div>
 
//       {/* Product Name */}
//       <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
//         {product.name}
//       </h2>
 
//       {/* Product Description */}
//       <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">
//         {product.description || "No description provided"}
//       </p>
 
//       {/* Footer - Optional */}
//       <div className="text-gray-400 dark:text-gray-500 text-xs text-center">
//         Added on: {new Date(product.createdAt).toLocaleDateString()}
//       </div>
//     </div>
//   );
// }
 
//AFTER
 
import React from "react";
import { FaBoxOpen } from "react-icons/fa"; // icon for product
 
export default function ProductCard({ product, onClick }) {
  const productImages = {
    TF6: "procuct_images_hardcoded/G6(n).png",
    TF8: "procuct_images_hardcoded/G8.png",
    TF10: "procuct_images_hardcoded/G10.png",
    Gateway: "procuct_images_hardcoded/Gateway.png",
  };
 
  return (
    <div
      className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-shadow duration-300 cursor-pointer p-5 flex flex-col justify-between w-72 h-96 hover:shadow-sm "
      onClick={() => onClick(product._id)}
    >
      {/* Image */}
      <div className="flex items-center justify-center mb-4 text-blue-500 h-40">
        {productImages[product.name] ? (
          <img
            src={productImages[product.name]}
            alt={product.name}
            className="max-h-full object-contain"
          />
        ) : (
          <FaBoxOpen size={32} />
        )}
      </div>
 
      {/* Product Name */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
        {product.name}
      </h2>
 
      {/* Product Description */}
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4 line-clamp-3">
        {product.description || "No description provided"}
      </p>
 
      {/* Footer */}
      <div className="text-gray-400 dark:text-gray-500 text-xs text-center">
        Added on: {new Date(product.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
 
 