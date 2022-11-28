import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const CategoryPageCard = ({ car, setSelectedCar }) => {
  const { user } = useContext(AuthContext);
  const {
    name,
    img,
    location,
    resalePrice,
    originalPrice,
    usedYear,
    postTime,
    sellerName,
    sellerId,
    verified,
    _id,
    sellerEmail,
  } = car;

  const priceDivider = (price) => {
    const commas = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return commas;
  };

  const handleReport = () => {
    const data = {
      carId: _id,
      reportedBy: user.email,
      name,
      sellerName,
      sellerId,
    };
    fetch("https://sell-my-car-server.vercel.app/reports", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Reported To Admin");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className='card bg-base-100 flex flex-cols md:flex-row md:rounded-none'>
        <figure className='md:w-1/3'>
          <img className='md:rounded-none' src={img} alt='Movie' />
        </figure>
        <div className='card-body gap-0 text-gray-500'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='card-title text-3xl text-black'>{name}</h2>
            {user?.email !== sellerEmail && (
              <div
                title='Report to admin'
                onClick={handleReport}
                className='text-right flex items-center gap-1 text-xs cursor-pointer hover:text-red-500'
              >
                <p>Report</p>
                <p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                    />
                  </svg>
                </p>
              </div>
            )}
          </div>
          <p className='text-sm font-medium flex items-center'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                />
              </svg>
            </span>
            <span>{location}</span>
          </p>
          <div className='font-semibold sm:flex'>
            <p className='text-xl font-semibold text-black'>
              ${priceDivider(resalePrice)}
            </p>
            <p className=''>Original Price: ${priceDivider(originalPrice)}</p>
          </div>
          <div>
            <p className='m-0'>
              Used for: {usedYear} {usedYear > 1 ? "Years" : "Year"}
            </p>
          </div>
          <div>
            <p className='flex items-center gap-1'>
              <span>By: {sellerName}</span>
              {verified && (
                <span className='text-blue-500'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-4 h-4'
                  >
                    <path
                      fillRule='evenodd'
                      d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              )}
            </p>
            <div></div>
          </div>
          <div className='card-actions justify-end flex items-center'>
            <p className='text-sm'> Posted On: {postTime}</p>
            {user?.email === sellerEmail ? (
              <label className='btn btn-sm btn-disabled'>Your Item</label>
            ) : (
              <label
                htmlFor='modalForm'
                onClick={() => setSelectedCar(car)}
                className='btn btn-primary btn-sm'
              >
                Book Now
              </label>
            )}
          </div>
        </div>
      </div>
      <div className='divider mt-0 md:mt-4'></div>
    </div>
  );
};

export default CategoryPageCard;
