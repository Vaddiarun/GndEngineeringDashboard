import React from "react";
import { FaBoxOpen } from "react-icons/fa"; // icon for product

export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-5 flex flex-col justify-between"
      onClick={() => onClick(product._id)}
    >
      {/* Icon */}
      <div className="flex items-center justify-center mb-4 text-blue-500">
        <FaBoxOpen size={32} />
      </div>

      {/* Product Name */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center">
        {product.name}
      </h2>

      {/* Product Description */}
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">
        {product.description || "No description provided"}
      </p>

      {/* Footer - Optional */}
      <div className="text-gray-400 dark:text-gray-500 text-xs text-center">
        Added on: {new Date(product.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
