import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ cardData }) => {
  return (
    <Link to=''>
      <div className='card card-compact w-full bg-base-100 hover:shadow-xl rounded'>
        <figure>
          <img
            className=''
            src='https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=60'
            alt='car'
          />
        </figure>
        <div className='card-body text-center'>
          <h2 className='card-title justify-center'>
            {cardData ? cardData : "Cars"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
