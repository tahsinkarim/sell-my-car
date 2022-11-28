import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ReportedItems = () => {
  const [deleteItem, setDeleteItem] = useState({});
  const { data: reportedItems = [], refetch } = useQuery({
    queryKey: ["reportedItems"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://sell-my-car-server.vercel.app/reports"
      );
      return data;
    },
  });

  const handleDelete = (id) => {
    axios
      .delete(`https://sell-my-car-server.vercel.app/reports/${id}`)
      .then((data) => {
        console.log(data);
        toast.success("Item Deleted");
        refetch();
      });
  };
  return (
    <div className='max-w-6xl mx-auto'>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2 text-center'>
        Reported Items
      </h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='bg-gray-700 text-white'></th>
              <th className='bg-gray-700 text-white'>Reported By</th>
              <th className='bg-gray-700 text-white'>Item</th>
              <th className='bg-gray-700 text-white'>Seller</th>
              <th className='bg-gray-700 text-white'>Delete Item</th>
            </tr>
          </thead>
          <tbody>
            {reportedItems?.map((car, i) => (
              <tr key={car._id}>
                <th>{i + 1}</th>
                <td>{car.reportedBy}</td>
                <td>{car.name}</td>
                <td>{car.sellerName}</td>
                <td>
                  <label
                    htmlFor='deleteReportedItem'
                    onClick={() => setDeleteItem(car)}
                    className='btn btn-sm btn-error'
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input type='checkbox' id='deleteReportedItem' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Are you sure you want to delete {deleteItem?.name} ?
          </h3>
          <p className='py-4'>Once deleted it can't be undone</p>
          <div className='modal-action'>
            <label
              htmlFor='deleteReportedItem'
              className='btn btn-outline btn-sm'
            >
              Cancel
            </label>
            <label
              onClick={() => handleDelete(deleteItem.carId)}
              htmlFor='deleteReportedItem'
              className='btn btn-error btn-sm'
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportedItems;
