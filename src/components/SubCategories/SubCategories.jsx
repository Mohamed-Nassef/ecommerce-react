import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
export default function SubCategories({ categoriID }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allSubcategories'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories');
      return data.data;
    },
    select: (data) => data.filter(sub => sub.category === categoriID)
  });

  if (isLoading) return <p className="text-center py-10 text-gray-500">Loading subcategories...</p>;
  if (isError) return <p className="text-center py-10 text-red-600">Failed to load subcategories.</p>;

  if (data.length === 0) {
    return <p className="text-center py-10 text-gray-400">No subcategories found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Subcategories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.map((sub) => (
          <div
            key={sub._id}
            className="p-5 bg-white rounded-xl border shadow hover:shadow-lg transition duration-300 text-center flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{sub.name}</h3>
              <p className="text-xs text-gray-400 mt-1">Slug: {sub.slug}</p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <Link
                to={`/subcategories/${sub._id}`}
                className="text-sm bg-blue-100 text-blue-700 py-1 rounded hover:bg-blue-200 transition"
              >
                View Details
              </Link>
              <Link
                to={`/categories/${sub.category}/subcategories`}
                className="text-sm bg-emerald-100 text-emerald-700 py-1 rounded hover:bg-emerald-200 transition"
              >
                View Category's Subcategories
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
