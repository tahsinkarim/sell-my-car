import React from "react";
import CarCards from "../../../Shared/CarCards/CarCards";

const AdvertisedItems = () => {
  const advertisedCarData = [1, 2, 3];

  if (advertisedCarData.length < 1) {
    return;
  }
  return (
    <div className='pt-20'>
      <h2 className='text-center text-3xl lg:text-4xl font-semibold mb-8'>
        Advertised Items
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {advertisedCarData?.map((card, i) => (
          <CarCards key={i}></CarCards>
        ))}
      </div>
    </div>
  );
};

export default AdvertisedItems;
