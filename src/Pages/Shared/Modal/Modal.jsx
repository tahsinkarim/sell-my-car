import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider";

const Modal = ({ selectedCar, closeModal, handleConfirmation }) => {
  const { name: carName, resalePrice } = selectedCar;
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset(selectedCar, user);
  }, [user, selectedCar]);

  return (
    <>
      <input type='checkbox' id='modalForm' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='modalForm'
            className='btn btn-sm btn-circle absolute right-2 top-2'
            onClick={closeModal}
          >
            ✕
          </label>
          <h3 className='text-lg font-bold mb-2 text-center'>
            Confirm Your Booking
          </h3>
          <form
            onSubmit={handleSubmit(handleConfirmation)}
            className='flex flex-col gap-4'
          >
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              {...register("displayName")}
              type='text'
              defaultValue={user.displayName}
              disabled
              readOnly
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              {...register("email")}
              type='text'
              defaultValue={user.email}
              disabled
              readOnly
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              {...register("carName")}
              type='text'
              defaultValue={carName}
              disabled
              readOnly
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              {...register("price")}
              type='text'
              defaultValue={resalePrice}
              disabled
              readOnly
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              {...register("phoneNumber")}
              placeholder='Phone Number'
              type='text'
              required
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              {...register("meetingLocation")}
              placeholder='Meeting Location'
              type='text'
              required
            />
            <input
              className='btn btn-primary w-full rounded'
              type='submit'
              value='Confirm Booking'
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
