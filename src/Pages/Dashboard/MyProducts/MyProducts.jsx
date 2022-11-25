import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProducts", user],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/myCars?email=${user?.email}`
      );
      return data;
    },
  });

  const switchToUnavailable = (id) => {
    axios
      .put(`http://localhost:5000/myCars/${id}`, {
        available: false,
        advertise: false,
      })
      .then((data) => {
        console.log(data);
        toast.success("Update Successfully");
        refetch();
      });
  };

  const switchToAvailable = (id) => {
    axios
      .put(`http://localhost:5000/myCars/${id}`, { available: true })
      .then((data) => {
        console.log(data);
        toast.success("Update Successfully");
        refetch();
      });
  };

  const handleAdvertise = (id) => {
    axios
      .put(`http://localhost:5000/myCars/${id}`, { advertise: true })
      .then((data) => {
        console.log(data);
        toast.success("Item Advertised");
        refetch();
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/myCars/${id}`).then((data) => {
      console.log(data);
      toast.success("Item Deleted");
      refetch();
    });
  };

  if (isLoading) {
    return <p>Loading . . .</p>;
  }
  console.log(myProducts);
  return (
    <div>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2'>All Sellers</h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Car Model</th>
              <th>Price</th>
              <th>Advertise</th>
              <th>Available</th>
              <th>Remove</th>
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
                      Not Available
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className='btn btn-xs btn-error'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
