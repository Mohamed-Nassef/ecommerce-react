import React from 'react';
import styles from './TopsSlider.module.css';
import Slider from 'react-slick';
import slide1 from '../../assets/slider-image-1.jpeg';
import slide2 from '../../assets/slider-image-2.jpeg';
import slide3 from '../../assets/slider-image-3.jpeg';
import slide4 from '../../assets/grocery-banner.png';
import slide5 from '../../assets/grocery-banner-2.jpeg';
export default function TopsSlider() {

  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };
  return (
    <>

      <div className=" container px-2 my-5 flex flex-row items-start ">
        <div className='w-full md:w-3/4 '>
          <Slider {...settings}>
            <div className="">
              <img src={slide3} alt="Slide 3" className="w-full h-60 object-cover" />
            </div>
            <div className="">
              <img src={slide4} alt="Slide 4" className="w-full h-60 object-cover" />
            </div>
            <div className="">
              <img src={slide5} alt="Slide 5" className="w-full h-60 object-cover" />
            </div>
          </Slider>
        </div>
        <div className='hidden md:flex w-1/4 flex-col items-start justify-start'>
          <div className="">
            <img src={slide1} alt="Slide 1" className="w-full h-30 object-cover" />
          </div>
          <div className="">
            <img src={slide2} alt="Slide 2" className="w-full h-30 object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}