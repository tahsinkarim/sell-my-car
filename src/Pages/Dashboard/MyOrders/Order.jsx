import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Order = ({ order, index }) => {
  const [carData, setCarData] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/availableCars/${order?.carId}`)
      .then((res) => res.json())
      .then((data) => {
        setCarData(data);
      });
  }, []);

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{order.carName}</td>
      <td>{order.price}</td>
      <td>{order.meetingLocation}</td>
      {carData?.available ? (
        <td>
          <Link
            to={`/dashboard/payment/${order._id}`}
            className='btn btn-sm btn-success'
          >
            Buy
          </Link>
        </td>
      ) : (
        <td>
          <button className='btn btn-sm btn-ghost'>Sold</button>
        </td>
      )}

      <td>
        <button
          onClick={() => handleDelete(order._id)}
          className='btn btn-sm btn-error'
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Order;
