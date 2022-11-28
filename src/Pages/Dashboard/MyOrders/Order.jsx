import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Order = ({ order, index, handleDelete }) => {
  const [carData, setCarData] = useState();

  useEffect(() => {
    fetch(`https://sell-my-car-server.vercel.app/availableCars/${order?.carId}`)
      .then((res) => res.json())
      .then((data) => {
        setCarData(data);
      });
  }, []);

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{order.carName}</td>
      <td>
        {order?.img && (
          <div className='avatar'>
            <div className='w-16 rounded'>
              <img className='' src={order.img} alt='' />
            </div>
          </div>
        )}
      </td>
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
