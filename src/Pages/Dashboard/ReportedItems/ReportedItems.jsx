import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const ReportedItems = () => {
  const { data: reportedItems = [] } = useQuery({
    queryKey: ["reportedItems"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/reports");
      return data;
    },
  });
  console.log(reportedItems);
  return (
    <div>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2'>All Sellers</h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Reported By</th>
              <th>Item</th>
              <th>Seller</th>
              <th>Remove Item</th>
            </tr>
          </thead>
          <tbody>
            {reportedItems?.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>{order.reportedBy}</td>
                <td>{order.name}</td>
                <td>{order.sellerName}</td>
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

export default ReportedItems;
