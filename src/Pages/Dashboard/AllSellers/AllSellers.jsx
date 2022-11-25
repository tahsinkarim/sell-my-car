import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const AllSellers = () => {
  const { user } = useContext(AuthContext);
  const { data: allSellers = [], isLoading } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/users/sellers");
      return data;
    },
  });

  if (isLoading) {
    return <p>Loading . . .</p>;
  }
  return (
    <div>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2'>All Sellers</h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verification</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {allSellers?.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>{order.user}</td>
                <td>{order.email}</td>
                <td>
                  {order.verified ? (
                    <button className='btn btn-sm btn-info'>Verified</button>
                  ) : (
                    <button className='btn btn-sm btn-ghost'>
                      Not Verified
                    </button>
                  )}
                </td>
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

export default AllSellers;
