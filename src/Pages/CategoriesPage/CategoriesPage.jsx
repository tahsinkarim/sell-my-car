import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import Modal from "../Shared/Modal/Modal";
import CategoryPageCard from "./CategoryPageCard";

const CategoriesPage = () => {
  const categoryCars = useLoaderData();
  const [selectedCar, setSelectedCar] = useState(null);
  const closeModal = () => {
    setSelectedCar(null);
  };

  const handleConfirmation = (data) => {
    console.log(data);
    toast.success("Booking Submitted");
    setSelectedCar(null);
  };
  return (
    <div className='max-w-7xl mx-auto px-8'>
      <div>
        {categoryCars.map((car) => (
          <CategoryPageCard
            setSelectedCar={setSelectedCar}
            car={car}
            key={car._id}
          ></CategoryPageCard>
        ))}
      </div>
      {selectedCar && (
        <Modal
          handleConfirmation={handleConfirmation}
          closeModal={closeModal}
          selectedCar={selectedCar}
        ></Modal>
      )}
    </div>
  );
};

export default CategoriesPage;
