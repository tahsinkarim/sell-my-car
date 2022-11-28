import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Modal from "../../../CategoriesPage/Modal/Modal";
import CarCards from "../../../Shared/CarCards/CarCards";

const AdvertisedItems = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const { data: advertisedCarData = [] } = useQuery({
    queryKey: ["advertisedCarData"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://sell-my-car-server.vercel.app/advertisedCars"
      );
      return data;
    },
  });

  const closeModal = () => {
    setSelectedCar(null);
  };

  if (advertisedCarData.length < 1) {
    return;
  }
  return (
    <div className='pt-28'>
      <h2 className='text-center text-3xl lg:text-4xl font-semibold mb-8'>
        Advertised Items
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {advertisedCarData?.map((card, i) => (
          <CarCards
            setSelectedCar={setSelectedCar}
            card={card}
            key={i}
          ></CarCards>
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

export default AdvertisedItems;
