import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import RecentProducts from '../RecentProducts/RecentProducts';
import SubCategories from '../SubCategories/SubCategories';

export default function CategoriesDetails() {

  const { id } = useParams();
  const [showProducts, setShowProducts] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['CategoriesDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      return data.data;
    },
  });

  if (isLoading) return <Spinner />;
  if (isError || !data) return <p className="text-center py-10 text-red-600">Failed to load category.</p>;

  const { image, name, slug } = data;

  return (
    <div className="">
      <div className=" bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300">
        <img
          src={image || 'https://via.placeholder.com/600x400?text=No+Image'}
          alt={name}
          className="pt-6 w-full h-80 object-contain"
        />
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500 mt-1">Slug: {slug}</p>

          {/* SubCategories */}
          <div className="mt-6">
            <SubCategories categoriID={id} />
          </div>

          {/* Show Products button */}
          <button
            onClick={() => setShowProducts(true)}
            className="mt-6 bg-emerald-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-emerald-700 transition duration-300">
            Show Products in {name}
          </button>
          {showProducts && (
            <div className="mt-10">
              <RecentProducts cat={name} />
            </div>
          )}
        </div>
      </div>

      {/* Recent Products */}

    </div>
  );
}
