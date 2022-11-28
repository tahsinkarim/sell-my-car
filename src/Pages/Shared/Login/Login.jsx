import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnim from "../../../assets/images/login.json";
import { AuthContext } from "../../../contexts/AuthProvider";
import useToken from "../../../hooks/useToken";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { logIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  //Redirect location
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleRegister = (data) => {
    console.log(data);
    setLoginError("");
    logIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setCreatedUserEmail(data.email);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  return (
    <div className='flex justify-center max-w-7xl mx-auto min-h-[70vh] mt-1 px-4'>
      <div className='hidden sm:flex sm:w-1/2 justify-center p-8'>
        <Lottie animationData={loginAnim} loop={true} />
      </div>
      <div className='w-full py-10 sm:py-0 sm:w-1/2 flex flex-col justify-center items-center'>
        <h2 className='text-3xl mb-8 font-bold'>Welcome Back!</h2>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className='flex flex-col gap-4 w-full items-center'
        >
          {loginError && (
            <div className='alert alert-error shadow-lg rounded py-2'>
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
                <span>{loginError}</span>
              </div>
            </div>
          )}
          <input
            className='input input-bordered w-full max-w-xs rounded'
            {...register("email")}
            placeholder='Email'
            type='email'
          />
          <input
            className='input input-bordered w-full max-w-xs rounded'
            {...register("password")}
            placeholder='Password'
            type='password'
          />
          <input
            className='btn btn-primary w-full max-w-xs rounded'
            type='submit'
            value='Log in'
          />
        </form>
        <Link to='/register'>
          <p className='text-sm mt-1 text-center text-gray-500 font-medium hover:underline'>
            Don't have a account? Sign Up
          </p>
        </Link>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
};

export default Login;
