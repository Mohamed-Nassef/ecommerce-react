import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
export default function CategoriesSlider() {

  let { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return data.data;
    },
    // refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5, // 5 minutes for caching
    // retry: 2, // Retry failed requests up to 2 times
    // retryDelay : 1000, // Wait 1 second before retrying
    // refetchOnWindowFocus: true, // Refetch when the window regains focus
    // keepPreviousData: true // Keep previous data while fetching new data  
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    dots: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="container mx-auto px-2 py-2">
      <h2 className="text-xl font-semibold mb-6">Shop by Category</h2>
      {isLoading ? (
        <Spinner />) : (
        <Slider {...settings}>
          {data.map(cat => (
            <div key={cat._id} className="px-0.5">
              <Link to={`/categories/${cat._id}`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-35 object rounded mb-2"
                />
                <h3 className="text-sm font-medium">{cat.name}</h3>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
