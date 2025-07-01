import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function RecentProducts({ cat, filterBy = 'name' }) {

  let { data, isFetched, isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      return data.data;
    },
  });
  const filteredProducts = data?.filter(product => {
    if (!cat) return true;

    if (filterBy === 'id') {
      return product.category._id === cat;
    }

    return product.category.name === cat;
  }) || [];

  const isEmpty = filteredProducts.length === 0;
  const Loading = isLoading || !isFetched;


  let { addToCart } = useContext(CartContext);
  const [loadingId, setLoadingId] = useState(null);
  async function handleAddToCart(productID) {
    setLoadingId(productID);
    let data = await addToCart(productID);

    if (data.status === 'success') {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    setLoadingId(null);
  }
  return (
    <section className="container mx-auto px-5 py-10">
      <h2 className="text-xl font-semibold mb-6">Shop Popular Categories</h2>
      {Loading ? (
        <Spinner />
      ) : isEmpty ? (
        <div className="bg-white max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center border border-gray-200">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Products Available</h2>
          <p className="text-gray-500 text-sm mb-4">
            There are no products found in this category right now. Please check back later!
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredProducts.map(product => (
            <ProductCard product={product} key={product.id} onAddToCart={handleAddToCart} loadingId={loadingId} />
          ))}
        </div>
      )}
    </section>
  );
}
