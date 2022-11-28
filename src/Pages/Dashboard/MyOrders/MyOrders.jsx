import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthProvider";
import Order from "./Order";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const {
    data: myOrders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [user.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://sell-my-car-server.vercel.app/orders/?email=${user.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return data;
    },
  });

  const handleDelete = (id) => {
    fetch(`https://sell-my-car-server.vercel.app/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Order Deleted");
          refetch();
        }
      });
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
    <div className='overflow-x-auto max-w-6xl mx-auto'>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2 text-center'>
        My Orders
      </h2>
      <table className='table w-full'>
        <thead>
          <tr>
            <th className='bg-gray-700 text-white'></th>
            <th className='bg-gray-700 text-white'>Item</th>
            <th className='bg-gray-700 text-white'>Image</th>
            <th className='bg-gray-700 text-white'>Price</th>
            <th className='bg-gray-700 text-white'>Location</th>
            <th className='bg-gray-700 text-white'>Buy</th>
            <th className='bg-gray-700 text-white'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {myOrders?.map((order, i) => (
            <Order
              key={order._id}
              order={order}
              index={i}
              handleDelete={handleDelete}
            ></Order>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
