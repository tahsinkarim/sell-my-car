import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
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
      const { data } = await axios.get("http://localhost:5000/users/sellers");
      return data;
    },
  });

  const handleVerification = (email) => {
    axios
      .put(`http://localhost:5000/users/sellers/${email}`, { verified: true })
      .then((data) => {
        console.log(data);
        toast.success("User Verified");
        refetch();
      });
  };

  const handleDelete = (email) => {
    axios.delete(`http://localhost:5000/users/${email}`).then((data) => {
      console.log(data);
      toast.success("Item Deleted");
      refetch();
    });
    console.log("Delete");
  };

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
