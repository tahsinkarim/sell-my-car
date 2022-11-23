import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState("");

  const handleRegister = (data) => {
    console.log(data);
    setLoginError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };
  return (
    <div className='flex justify-center py-8'>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='flex flex-col gap-4'
      >
        <h2 className='text-center text-2xl font-semibold'>Sign Up</h2>
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
          value='Sign Up'
          type='submit'
        />
      </form>
    </div>
  );
};

export default Register;
