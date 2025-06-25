import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart, loadingId }) {
  const isLoading = loadingId === product._id;

  return (
    <div className='shadow hover:shadow-lg rounded-md transition overflow-hidden w-full'>
      <div className="group relative flex flex-col  transition">

        <div className="bg-white p-4 w-full flex flex-col ">
          <Link to={`/productsdetails/${product._id}`} className='w-full flex flex-col '>
            <img src={product.imageCover} alt={product.title} className="w-full h-40 object-contain mb-3" />
            <p className="text-emerald-600 text-sm mb-1">{product.category.name}</p>
            <h3 className="text-sm font-medium h-10 line-clamp-2 overflow-hidden ">{product.title}</h3>
            <div className="flex justify-between  w-full mt-2">
              <span className="text-sm font-semibold">{product.price} EGP</span>
              <span className="text-xs text-yellow-500">⭐ {product.ratingsAverage}</span>
            </div>
          </Link>
          <button
            onClick={() => onAddToCart(product._id)}
            disabled={isLoading}
            className={`mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded-full
                 ${isLoading ? 'opacity-50 cursor-progress' : 'hover:bg-emerald-700 cursor-pointer group-hover:opacity-100  translate-y-2 group-hover:translate-y-0 transition duration-300 active:scale-95'}`}>
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>

      </div>
    </div>
  );
}
