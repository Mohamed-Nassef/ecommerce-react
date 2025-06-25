import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function RecentProducts({ cat }) {

  let { data, isFetched, isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      return data.data;
    },
  });
  const filteredProducts = data?.filter(product =>
    !cat || product.category.name === cat
  ) || [];
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
