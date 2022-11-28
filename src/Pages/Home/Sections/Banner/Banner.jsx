import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import car1 from "../../../../assets/images/car1.jpg";
import car2 from "../../../../assets/images/car2.jpg";
import car3 from "../../../../assets/images/car3.jpg";
import car4 from "../../../../assets/images/car4.jpg";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className='relative max-w-7xl mx-auto overflow-x-hidden overflow-y-hidden'>
      <Slider {...settings}>
        <div>
          <div className='filter brightness-50'>
            <img className='w-full h-[50vh] object-cover' src={car1} alt='' />
          </div>
        </div>
        <div>
          <div className='filter brightness-50'>
            <img className='w-full h-[50vh] object-cover' src={car2} alt='' />
          </div>
        </div>
        <div>
          <div className='filter brightness-50'>
            <img className='w-full h-[50vh] object-cover' src={car3} alt='' />
          </div>
        </div>
        <div>
          <div className='filter brightness-50'>
            <img className='w-full h-[50vh] object-cover' src={car4} alt='' />
          </div>
        </div>
      </Slider>
      <div className='px-4 sm:text-center absolute bottom-0 top-0 right-0 left-0 text-white flex flex-col justify-center'>
        <h1 className='text-3xl md:text-5xl font-bold'>
          Shop SMART Drive Happy
        </h1>
        <p className='text-2xl sm:text-3xl font-semibold mt-4'>
          Car Buying Made Easy
        </p>
        <Link className='btn btn-primary mt-8 w-44 sm:mx-auto' to='/register'>
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default Banner;
