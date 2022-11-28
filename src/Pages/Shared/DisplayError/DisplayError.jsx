import Lottie from "lottie-react";
import React, { useContext } from "react";
import { Link, useRouteError } from "react-router-dom";
import erroranim from "../../../assets/images/erroranim.json";
import { AuthContext } from "../../../contexts/AuthProvider";

const DisplayError = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const error = useRouteError();

  return (
    <div className='flex h-screen justify-center items-center max-w-7xl mx-auto px-4'>
      <div>
        <div>
          <div className='alert alert-error shadow-lg max-w-sm mx-auto'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <div className='max-w-2xl mx-auto'>
                <p className=''>Something went wrong</p>
                <p className=''>{error.status || error.message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <Lottie animationData={erroranim} loop={true} />
        </div>
        <div className='flex flex-col items-center'>
          <h3>
            <span>Please </span>
            <button
              onClick={handleLogout}
              className='btn btn-primary btn-xs my-2 mx-1'
            >
              Log out
            </button>
            <span> and Sign in again</span>
          </h3>
          <p className='py-4'>Or go to</p>
          <h3>
            <Link className='btn btn-primary' to='/'>
              Home
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DisplayError;
