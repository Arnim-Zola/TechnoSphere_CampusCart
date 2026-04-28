"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const PEN_BRANDS = ["Hauser", "Rorito", "Trimax", "Pentonic"];

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedBrand, setSelectedBrand] = useState(PEN_BRANDS[0]);

  const isPen = product.category === "Writing Essentials" && product.name.toLowerCase().includes("pen");

  const handleAddToCart = () => {
    if (isPen) {
      addToCart({ ...product, name: `${product.name} (${selectedBrand})`, brand: selectedBrand });
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.05)] border border-gray-100 dark:border-zinc-800 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full h-56 bg-gray-100 dark:bg-zinc-800 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${!product.inStock && "grayscale opacity-70"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">No Image</div>
        )}
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">{product.description}</p>
        
        {isPen && (
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Select Brand</label>
            <select 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 transition-colors cursor-pointer outline-none"
            >
              {PEN_BRANDS.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
          <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">₹{parseFloat(product.price).toFixed(2)}</span>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center ${
              product.inStock 
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 shadow-sm" 
                : "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
