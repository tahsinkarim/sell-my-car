import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const Modal = ({ selectedCar, closeModal, setSelectedCar }) => {
  const { name: carName, resalePrice, img } = selectedCar;
  const { user } = useContext(AuthContext);

  console.log(selectedCar);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      carName: form.carName.value,
      img,
      carId: selectedCar?._id,
      price: form.price.value,
      phoneNumber: form.phoneNumber.value,
      meetingLocation: form.meetingLocation.value,
    };
    fetch("https://sell-my-car-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Booking Submitted");
          setSelectedCar(null);
        }
      });
  };

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
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              name='name'
              type='text'
              defaultValue={user.displayName}
              disabled
              readOnly
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              name='email'
              type='text'
              defaultValue={user.email}
              disabled
              readOnly
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              name='carName'
              type='text'
              defaultValue={carName}
              disabled
              readOnly
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              name='price'
              type='text'
              defaultValue={resalePrice}
              disabled
              readOnly
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              name='phoneNumber'
              placeholder='Phone Number'
              type='text'
              required
            />
            <input
              className='input input-bordered h-auto py-2 w-full rounded'
              name='meetingLocation'
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
