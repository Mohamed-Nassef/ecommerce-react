import React, { useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export default function Products() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
      return data;
    },
    keepPreviousData: true,
  });

  const handleNextPage = () => {
    if (data.metadata.nextPage) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };


  let { addToCart } = useContext(CartContext);
  const [loadingId, setLoadingId] = useState(null);
  async function handleAddToCart(productID) {
    setLoadingId(productID);
    let data = await addToCart(productID);
    if (data.status == 'success') {
      toast.success(data.message)
      setLoadingId(null); // Reset loadingId after successful addition
    }
    else
      toast.error(data.message)
  }

  if (isLoading || !data) return <Spinner />;
  if (isError) return <p className="text-red-500">Error fetching products</p>;

  return (
    <section className="container mx-auto px-5 py-10">
      <h2 className="text-xl font-semibold mb-6">All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.data.map((product) => (
          <ProductCard product={product} key={product.id} onAddToCart={handleAddToCart} loadingId={loadingId} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 mt-2">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={!data.metadata.nextPage}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
