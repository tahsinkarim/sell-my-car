import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import Order from "./Order";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: myOrders = [], refetch } = useQuery({
    queryKey: [user.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/orders/?email=${user.email}`,
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
