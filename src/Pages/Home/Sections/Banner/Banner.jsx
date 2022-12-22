import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import car1 from "../../../../assets/images/car1.jpg";
import car2 from "../../../../assets/images/car2.jpg";
import car3 from "../../../../assets/images/car3.jpg";
import car4 from "../../../../assets/images/car4.jpg";
import heroImg from "../../../../assets/images/hero.jpg";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const items = [
    {
      id: 0,
      name: "Sedan",
    },
    {
      id: 1,
      name: "Eleectric",
    },
    {
      id: 2,
      name: "SUV",
    },
  ];

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  return (
    <div className='relative'>
      <div>
        <img
          className='object-cover w-full md:min-h-[500px]'
          src={heroImg}
          alt=''
        />
      </div>
      <div className='px-4 absolute bottom-0 top-0 right-0 left-0 text-white flex flex-col sm:items-end max-w-7xl mx-auto md:pr-10 xl:pr-12 pt-8 sm:pt-24 md:pt-20 xl:pt-56'>
        <div className='flex md:justify-end lg:pt-0 w-full'>
          <div className='w-full md:w-1/2'>
            <div className='flex justify-end md:justify-start'>
              <h1 className='text-2xl sm:text-4xl xl:text-5xl font-semibold text-gray-800 tracking-tighter w-[200px] sm:w-[300px] max-w-[500px] md:w-full xl:w-full text-left justify-self-end'>
                Find the car you want, Your Way
              </h1>
            </div>
            <p className='text-lg xl:text-2xl font-bold mt-4 text-gray-800 hidden md:block'>
              Then, build your deal to fit your needs.
            </p>
            <form className='max-w-xl w-full md:w-[400px] md:mx-0 mx-auto'>
              <div className='flex items-center py-3 bg-white my-8 rounded border border-gray-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-6 h-6 text-gray-600 ml-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>

                <input
                  className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                  type='text'
                  placeholder='Search By Category'
                  aria-label='Search'
                />
              </div>
            </form>
            <div className='w-full md:w-[400px] hidden md:block'>
              <div className='flex gap-2 my-4'>
                <button className='btn btn-primary rounded-full w-[48%] h-0 min-h-[40px] text-white'>
                  Shop New Car
                </button>
                <button className='btn btn-primary rounded-full w-[48%] h-0 min-h-[40px] text-white'>
                  Shop Used Car
                </button>
              </div>
              <div>
                <button className='btn btn-primary rounded-full w-full h-0 min-h-[40px] bg-white text-primary hover:text-black'>
                  Sell Your Car
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='md:hidden mx-4 flex flex-col gap-2 mt-8 relative z-10'>
        <button className='btn btn-primary rounded-full h-0 min-h-[40px] text-white'>
          Shop New Car
        </button>
        <button className='btn btn-primary rounded-full h-0 min-h-[40px] text-white'>
          Shop Used Car
        </button>
        <button className='btn btn-primary rounded-full h-0 min-h-[40px] bg-white text-primary hover:text-black'>
          Sell Your Car
        </button>
      </div>
    </div>
  );
};

export default Banner;
