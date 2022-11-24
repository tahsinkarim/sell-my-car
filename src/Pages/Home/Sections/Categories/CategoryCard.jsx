import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ carData }) => {
  const { categoryName, _id, img } = carData;
  return (
    <Link to={`/category/${_id}`}>
      <div className='card card-compact w-full bg-base-100 hover:shadow-xl rounded hover:text-primary hover:border-b-4 hover:border-primary duration-200'>
        <figure>
          <img className='' src={img} alt='car' />
        </figure>
        <div className='card-body text-center'>
          <h2 className='card-title justify-center'>
            {carData ? categoryName : "Best Cars"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
