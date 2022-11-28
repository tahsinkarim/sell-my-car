import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";

import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const AllSellers = () => {
  const { user } = useContext(AuthContext);
  const [deleteItem, setDeleteItem] = useState({});
  const {
    data: allSellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://sell-my-car-server.vercel.app/users/sellers",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return data;
    },
  });

  const handleVerification = (email) => {
    axios
      .put(`https://sell-my-car-server.vercel.app/users/sellers/${email}`, {
        verified: true,
      })
      .then((data) => {
        console.log(data);
        toast.success("User Verified");
        refetch();
      });
  };

  const handleDelete = (email) => {
    axios
      .delete(`https://sell-my-car-server.vercel.app/users/${email}`)
      .then((data) => {
        console.log(data);
        toast.success("Item Deleted");
        refetch();
      });
    console.log("Delete");
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
    <div className='max-w-6xl mx-auto'>
      <h2 className='mt-4 mb-6 text-3xl font-semibold pl-2 text-center'>
        All Sellers
      </h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='bg-gray-700 text-white'></th>
              <th className='bg-gray-700 text-white'>Name</th>
              <th className='bg-gray-700 text-white'>Email</th>
              <th className='bg-gray-700 text-white'>Verification</th>
              <th className='bg-gray-700 text-white'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {allSellers?.map((seller, i) => (
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <td>{seller.user}</td>
                <td>{seller.email}</td>
                <td>
                  {seller.verified ? (
                    <button className='btn btn-sm btn-info'>Verified</button>
                  ) : (
                    <button
                      onClick={() => handleVerification(seller.email)}
                      className='btn btn-sm btn-ghost'
                    >
                      Not Verified
                    </button>
                  )}
                </td>
                <td>
                  <label
                    htmlFor='confirmationModal'
                    onClick={() => setDeleteItem(seller)}
                    className='btn btn-sm btn-error'
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteItem && (
        <ConfirmationModal
          itemName={deleteItem.email}
          itemId={deleteItem.email}
          handleDelete={handleDelete}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSellers;
