import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddProduct = () => {
  const [selectedFile, setSelectedFile] = useState();

  const { user } = useContext(AuthContext);
  //Get If the seller is verified
  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["verifiedSeller"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://sell-my-car-server.vercel.app/users?email=${user?.email}`
      );
      return data;
    },
  });
  console.log(userData);

  const navigate = useNavigate();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const imageHostKey = import.meta.env.VITE_imgBb;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    const sellerEmail = user.email;
    const sellerName = user.displayName;
    const verified = userData[0].verified;
    const name = form.name.value;
    const resalePrice = form.price.value;
    const originalPrice = form.originalPrice.value;
    const condition = form.condition.value;
    const categoryId = form.category.value;
    const phoneNumber = form.phoneNumber.value;
    const location = form.location.value;
    const yearOfPurchase = form.yearOfPurchase.value;
    const usedYear = form.usedYear.value;
    const date = format(new Date(), "PP");
    const formData = new FormData();
    formData.append("image", selectedFile);

    //Upload Image
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const carData = {
            sellerEmail,
            sellerName,
            verified,
            name,
            resalePrice,
            condition,
            categoryId,
            phoneNumber,
            location,
            yearOfPurchase,
            usedYear,
            img: imgData.data.url,
            available: true,
            postTime: date,
            originalPrice,
          };

          fetch("https://sell-my-car-server.vercel.app/availableCars", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(carData),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${name} car is added successfully`);
              navigate("/dashboard/myProducts");
            });
        }
      });
    form.reset();
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[70vh]'>
        <Audio
          height='80'
          width='80'
          radius='9'
          color='purple'
          ariaLabel='three-dots-loading'
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-center font-semibold text-3xl mb-4'>
        Put a car for sale
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3 max-w-3xl mx-auto px-1 mb-10'
      >
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text font-semibold'>Car Image</span>
          </label>
          <input
            type='file'
            className='file-input file-input-bordered w-full'
            name='image'
            onChange={changeHandler}
            required
          />
        </div>
        <input
          type='text'
          placeholder='Car Name'
          className='input input-bordered w-full'
          name='name'
          required
        />
        <input
          type='text'
          placeholder='Resale Price'
          className='input input-bordered w-full'
          name='price'
          required
        />
        <input
          type='text'
          placeholder='Buying Price'
          className='input input-bordered w-full'
          name='originalPrice'
          required
        />
        <input
          type='text'
          placeholder='Year of Purchase'
          className='input input-bordered w-full'
          name='yearOfPurchase'
          required
        />
        <input
          type='text'
          placeholder='Used Year'
          className='input input-bordered w-full'
          name='usedYear'
          required
        />
        <div className='sm:flex justify-between'>
          <div className='form-control w-full sm:w-2/5'>
            <label className='label'>
              <span className='label-text font-semibold'>Condition</span>
            </label>
            <select
              required
              className='select select-bordered w-full max-w-xs mb-3'
              name='condition'
            >
              <option value='Excellent'>Excellent</option>
              <option value='Good'>Good</option>
              <option value='Fair'>Fair</option>
            </select>
          </div>
          <div className='form-control w-full sm:w-2/5'>
            <label className='label'>
              <span className='label-text font-semibold'>Category</span>
            </label>
            <select
              name='category'
              required
              className='select select-bordered w-full max-w-xs'
            >
              <option value='637f0a24091fa251702fc8d8'>Sedan</option>
              <option value='637f0a24091fa251702fc8d9'>SUVs</option>
              <option value='637f0a24091fa251702fc8da'>EVs</option>
            </select>
          </div>
        </div>
        <label className='label font-semibold pb-0' htmlFor='user'>
          Seller Info
        </label>
        <input
          type='email'
          placeholder='Email'
          className='input input-bordered w-full'
          name='sellerEmail'
          defaultValue={user?.email}
          disabled
          required
        />
        <input
          type='text'
          placeholder='Phone Number'
          className='input input-bordered w-full'
          name='phoneNumber'
          required
        />
        <input
          type='text'
          placeholder='Location'
          className='input input-bordered w-full'
          name='location'
          required
        />
        <input type='submit' className='btn btn-primary' />
      </form>
    </div>
  );
};

export default AddProduct;
