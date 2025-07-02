import React, { use } from 'react';
import styles from './BrandsDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import RecentProducts from '../RecentProducts/RecentProducts';
export default function BrandsDetails() {
  const { id } = useParams();

  let { data, isLoading } = useQuery({
    queryKey: ['brandDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      return data.data;
    }
  });
  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="bg-white p-4 w-full flex flex-col ">
        <img src={data.image} alt={data.slug} className="w-full h-40 object-contain mb-3" />
        <div className='text-center'>
          <p className="text-emerald-600 text-sm mb-1">{data.name}</p>
          <h3 className="text-sm font-medium h-10 line-clamp-2 overflow-hidden ">{data.slug}</h3>
        </div>
      </div>
      <RecentProducts cat={id} filterBy="idbrand" />
    </>
  );
}