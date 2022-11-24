import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "../Shared/Modal/Modal";
import CategoryPageCard from "./CategoryPageCard";

const CategoriesPage = () => {
  const categoryCars = useLoaderData();
  const [selectedCar, setSelectedCar] = useState(null);
  const closeModal = () => {
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
          closeModal={closeModal}
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
        ></Modal>
      )}
    </div>
  );
};

export default CategoriesPage;
