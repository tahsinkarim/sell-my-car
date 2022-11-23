import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className='hero'
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=60")`,
      }}
    >
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md py-20'>
          <h1 className='mb-5 text-4xl font-bold text-left'>
            Buy or sell a car from <br /> your happy place.
          </h1>
          <Link to='/register' className='btn btn-primary'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
