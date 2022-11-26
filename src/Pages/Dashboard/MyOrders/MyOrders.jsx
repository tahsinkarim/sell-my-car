import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: myOrders = [], refetch } = useQuery({
    queryKey: [user.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/orders?email=${user.email}`,
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
    fetch(`http://localhost:5000/orders/${id}`, {
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

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Price</th>
            <th>Location</th>
            <th>Buy</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {myOrders?.map((order, i) => (
            <tr key={order._id}>
              <th>{i + 1}</th>
              <td>{order.carName}</td>
              <td>{order.price}</td>
              <td>{order.meetingLocation}</td>
              <td>
                <button className='btn btn-sm btn-success'>Buy</button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(order._id)}
                  className='btn btn-sm btn-error'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
