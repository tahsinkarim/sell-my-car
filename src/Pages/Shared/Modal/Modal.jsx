import React from "react";

const Modal = ({ selectedCar, closeModal }) => {
  console.log(selectedCar, "modal");
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
          <h3 className='text-lg font-bold'>{selectedCar?.name}</h3>
          <p className='py-4'>
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </div>
      </div>
    </>
  );
};

export default Modal;
