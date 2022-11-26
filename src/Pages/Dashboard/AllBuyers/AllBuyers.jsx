import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const AllBuyers = () => {
  const { user } = useContext(AuthContext);
  const [deleteItem, setDeleteItem] = useState();
  const { data: allBuyers = [], refetch } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/users/buyers");
      return data;
    },
  });

  const handleDelete = (email) => {
    axios.delete(`http://localhost:5000/users/${email}`).then((data) => {
      console.log(data);
      toast.success("Item Deleted");
      refetch();
    });
  };

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
            {allBuyers?.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.user}</td>
                <td>{buyer.email}</td>
                <td>
                  <label
                    htmlFor='confirmationModal'
                    onClick={() => setDeleteItem(buyer)}
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

export default AllBuyers;
