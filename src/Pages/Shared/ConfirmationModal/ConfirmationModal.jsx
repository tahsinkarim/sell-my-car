import React from "react";

const ConfirmationModal = ({ itemName, itemId, handleDelete }) => {
  return (
    <>
      <input type='checkbox' id='confirmationModal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Are you sure you want to delete {itemName} ?
          </h3>
          <p className='py-4'>Once deleted it can't be undone</p>
          <div className='modal-action'>
            <label
              htmlFor='confirmationModal'
              className='btn btn-outline btn-sm'
            >
              Cancel
            </label>
            <label
              onClick={() => handleDelete(itemId)}
              htmlFor='confirmationModal'
              className='btn btn-error btn-sm'
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
