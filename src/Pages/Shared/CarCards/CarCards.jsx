import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const CarCards = ({ card, setSelectedCar }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className='card card-compact w-full bg-base-100 shadow-xl rounded'>
      <figure>
        <img className='' src={card.img} alt='car' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{card.name}</h2>
        <p className='text-xs'>Location: {card.location}</p>
        <p className='text-md font-semibold'>Price: ${card.resalePrice}</p>
        <div className='card-actions justify-end'>
          {user ? (
            <label
              htmlFor='modalForm'
              onClick={() => setSelectedCar(card)}
              className='btn btn-primary btn-sm'
            >
              Book Now
            </label>
          ) : (
            <Link to='/login' className='btn btn-primary btn-xs'>
              Log in to book this item
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCards;
