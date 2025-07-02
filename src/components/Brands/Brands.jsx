import React, { useState } from 'react';
import styles from './Brands.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';

export default function Brands() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['brands', page],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`);
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
  if (isLoading || !data) return <Spinner />;
  if (isError) return <p className="text-red-500">Error fetching Brands </p>;
  return (
    <>
      <section className="container mx-auto px-5 py-10">
        <h2 className="text-xl font-semibold mb-6">All Products Brands</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.data.map((product) => (
            <div key={product._id} className="bg-white p-4 w-full flex flex-col ">
              <Link to={`/brands/${product._id}`} className='w-full flex flex-col '>
                <img src={product.image} alt={product.slug} className="w-full h-40 object-contain mb-3" />
                <div className='text-center'>
                  <p className="text-emerald-600 text-sm mb-1">{product.name}</p>
                  <h3 className="text-sm font-medium h-10 line-clamp-2 overflow-hidden ">{product.slug}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50">
            Previous
          </button>
          <span className="text-sm text-gray-700 mt-2">Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={!data.metadata.nextPage}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </section>
    </>
  );
}