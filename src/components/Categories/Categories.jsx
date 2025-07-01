import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';


export default function Categories() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return res.data.data;
    },
    refetchOnWindowFocus: false
  });


  return (
    <>
      <div className="container mx-auto px-2 py-6">
        <h2 className="text-xl font-semibold mb-6">Shop by Category</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.map(cat => (
                <div key={cat._id} className="bg-white shadow-sm p-3 rounded text-center hover:shadow-md transition">
                  <Link to={`/categories/${cat._id}`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="text-sm font-medium">{cat.name}</h3>

                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
