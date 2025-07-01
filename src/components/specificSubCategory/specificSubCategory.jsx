import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import RecentProducts from '../RecentProducts/RecentProducts';
export default function SpecificSubCategory() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['specificSubcategory', id],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
      return data.data;
    }
  });

  if (isLoading) return <p className="text-center py-10 text-gray-500">Loading subcategory...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error loading subcategory.</p>;
  const subdata = data || {};
  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{subdata.name}</h2>
        <p className="text-sm text-gray-500 mt-2">Slug: {subdata.slug}</p>
        <p className="text-xs text-gray-400 mt-1">Category ID: {subdata.category}</p>
      </div>
      <RecentProducts cat={subdata.category} filterBy="id" />
    </>
  );
}
