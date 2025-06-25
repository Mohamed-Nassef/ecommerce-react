import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import RecentProducts from '../RecentProducts/RecentProducts';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export default function ProductDetails() {

  const { id } = useParams();

  let { data, isLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      return data.data;
    }
  });

  const product = data || {};
  const [mainImage, setMainImage] = useState(null);

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


  useEffect(() => {
    if (data) {
      setMainImage(data.imageCover);
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
            <div className="flex md:flex-col gap-2 md:max-h-[400px] overflow-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-14 h-14 object-cover rounded border cursor-pointer hover:border-emerald-600 transition ${mainImage === img ? 'border-emerald-600' : 'border-gray-300'}`}
                  alt={`thumb-${index}`}
                />
              ))}
            </div>
            <div className="flex-1">
              <img
                src={mainImage}
                alt="Main product"
                className="w-full max-h-[350px] object-contain rounded shadow"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>
            <p className="text-sm text-emerald-600 mb-1">{product.category.name}</p>
            <p className="text-lg font-bold mb-3">{product.price} EGP</p>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-yellow-500 text-sm">⭐</span>
              <span className="text-sm font-medium">{product.ratingsAverage}</span>
            </div>
            <button
              onClick={() => handleAddToCart(product._id)}
              disabled={loadingId === product._id}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loadingId === product._id ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      </div>
      <RecentProducts cat={product.category.name} />
    </div>
  );
}
