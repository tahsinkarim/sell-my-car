import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const AllBuyers = () => {
  const { user } = useContext(AuthContext);
  const { data: allBuyers = [] } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/users/buyers");
      return data;
    },
  });
  console.log(allBuyers);
  return (
    <div>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2'>All Buyers</h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {allBuyers?.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>{order.user}</td>
                <td>{order.email}</td>
                <td>
                  <button className='btn btn-sm btn-error'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;
