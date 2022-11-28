import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CategoryPageCard from "./CategoryPageCard";
import Modal from "./Modal/Modal";

const CategoriesPage = () => {
  const { id } = useParams();
  const [selectedCar, setSelectedCar] = useState(null);
  const { data: categoryCars = [], isLoading } = useQuery({
    queryKey: ["categoryCards"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://sell-my-car-server.vercel.app/category/${id}`
      );
      return data;
    },
  });
  const closeModal = () => {
    setSelectedCar(null);
  };
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[70vh]'>
        <Helmet>
          <title>Categories</title>
        </Helmet>
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
    <div className='max-w-7xl mx-auto px-8 my-10 min-h-[65vh]'>
      <div>
        {categoryCars?.map((car) => (
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
