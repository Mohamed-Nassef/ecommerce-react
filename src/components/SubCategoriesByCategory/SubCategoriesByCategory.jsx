import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function SubCategoriesByCategory({ categoryId }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['subcategoriesByCategory', categoryId],
    queryFn: async () => {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
      return res.data.data;
    },
  });

  if (isLoading) return <p className="text-center py-10 text-gray-500">Loading subcategories...</p>;
  if (isError) return <p className="text-center py-10 text-red-600">Failed to load subcategories.</p>;

  if (data.length === 0) {
    return <p className="text-center py-10 text-gray-400">No subcategories found for this category.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Subcategories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.map((sub) => (
          <div key={sub._id} className="bg-white p-4 rounded shadow text-center hover:shadow-md transition">
            <h3 className="text-sm font-medium text-gray-700">{sub.name}</h3>
            <p className="text-xs text-gray-400 mt-1">Slug: {sub.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
