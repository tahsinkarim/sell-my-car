import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, updateInfo } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (data) => {
    setSubmitLoading(true);
    setLoginError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        updateInfo({ displayName: data.displayName })
          .then(() => {
            saveUser(data.displayName, data.role, data.email);
            setSubmitLoading(false);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const saveUser = (displayName, role, email) => {
    const userInfo = {
      user: displayName,
      role,
      email,
      verified: false,
    };

    fetch(`http://localhost:5000/users/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
        navigate("/");
      });
  };
  return (
    <div className='flex justify-center py-8'>
      <div>
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
            {...register("displayName")}
            placeholder='Name'
            type='text'
          />
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
          <select {...register("role", { required: true })}>
            <option value='buyer'>Buyer</option>
            <option value='seller'>Seller</option>
          </select>
          {submitLoading ? (
            <input
              className='btn btn-primary w-full max-w-xs rounded'
              value='Signing Up...'
              disabled
            />
          ) : (
            <input
              className='btn btn-primary w-full max-w-xs rounded'
              value='Sign Up'
              type='submit'
            />
          )}
        </form>
        <Link to='/login'>
          <p className='text-sm mt-1 text-center text-gray-500 font-medium hover:underline'>
            Already have a account? Log in
          </p>
        </Link>
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
};

export default Register;
