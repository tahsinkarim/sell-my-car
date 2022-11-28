import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [updateItem, setUpdateItem] = useState({});
  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProducts", user],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://sell-my-car-server.vercel.app/myCars?email=${user?.email}`
      );
      return data;
    },
  });

  console.log(myProducts);

  const switchToUnavailable = (id) => {
    axios
      .put(`https://sell-my-car-server.vercel.app/myCars/${id}`, {
        available: false,
        advertise: false,
      })
      .then((data) => {
        console.log(data);
        toast.success("Marked as Sold");
        refetch();
      });
  };

  const switchToAvailable = (id) => {
    axios
      .put(`https://sell-my-car-server.vercel.app/myCars/${id}`, {
        available: true,
      })
      .then((data) => {
        console.log(data);
        toast.success("Update Successfully");
        refetch();
      });
  };

  const handleAdvertise = (id) => {
    axios
      .put(`https://sell-my-car-server.vercel.app/myCars/${id}`, {
        advertise: true,
      })
      .then((data) => {
        console.log(data);
        toast.success("Item Advertised");
        refetch();
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://sell-my-car-server.vercel.app/myCars/${id}`)
      .then((data) => {
        console.log(data);
        toast.success("Item Deleted");
        refetch();
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const resalePrice = form.resalePrice.value;
    const updatedData = { name, resalePrice };
    axios
      .put(
        `https://sell-my-car-server.vercel.app/myCars/${updateItem?._id}`,
        updatedData
      )
      .then((data) => {
        console.log(data);
        toast.success("Item Updated");
        refetch();
      });
  };

  if (isLoading) {
    return <p>Loading . . .</p>;
  }
  return (
    <div className='max-w-6xl mx-auto'>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2 text-center'>
        My Products
      </h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='bg-gray-700 text-white'></th>
              <th className='bg-gray-700 text-white'>Car Model</th>
              <th className='bg-gray-700 text-white'>Price</th>
              <th className='bg-gray-700 text-white'>Advertise</th>
              <th className='bg-gray-700 text-white'>Available</th>
              <th className='bg-gray-700 text-white'>Update/Remove</th>
            </tr>
          </thead>
          <tbody>
            {myProducts?.map((car, i) => (
              <tr key={car._id}>
                <th>{i + 1}</th>
                <td>{car.name}</td>
                <td>{car.resalePrice}</td>
                <td>
                  {car.advertise ? (
                    <button className='btn btn-xs btn-ghost'>
                      Already Advertised
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdvertise(car._id)}
                      className={`${
                        !car.available && "hidden"
                      } btn btn-xs btn-success`}
                    >
                      Advertise this item
                    </button>
                  )}
                </td>
                <td>
                  {car.available ? (
                    <button
                      onClick={() => switchToUnavailable(car._id)}
                      className='btn btn-xs btn-success'
                    >
                      Available
                    </button>
                  ) : (
                    <button
                      onClick={() => switchToAvailable(car._id)}
                      className='btn btn-xs btn-ghost'
                    >
                      Sold
                    </button>
                  )}
                </td>
                {car.available && (
                  <td>
                    <label
                      htmlFor='updateModal'
                      className='btn btn-xs btn-warning mr-1'
                      onClick={() => setUpdateItem(car)}
                    >
                      Update
                    </label>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className='btn btn-xs btn-error'
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input type='checkbox' id='updateModal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Update Info About Your Car</h3>
          <form onSubmit={handleUpdate}>
            <div className='form-control w-full'>
              <label className='label label-text font-bold'>Car Model</label>
              <input
                type='text'
                name='name'
                className='input input-bordered w-full max-w-xs'
                defaultValue={updateItem.name}
              />
            </div>
            <div className='form-control w-full'>
              <label className='label label-text font-bold'>Price</label>
              <input
                type='text'
                name='resalePrice'
                className='input input-bordered w-full max-w-xs'
                defaultValue={updateItem.resalePrice}
              />
            </div>
            <div className='modal-action'>
              <label htmlFor='updateModal' className='btn btn-outline btn-sm'>
                Cancel
              </label>
              <button type='submit' className='btn btn-sm'>
                <label htmlFor='updateModal'>Update</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
