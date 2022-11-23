import React from "react";

const CarCards = ({ cardData }) => {
  return (
    <div className='card card-compact w-full bg-base-100 shadow-xl rounded'>
      <figure>
        <img
          className=''
          src='https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=60'
          alt='car'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{cardData ? cardData : "Cars"}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CarCards;
