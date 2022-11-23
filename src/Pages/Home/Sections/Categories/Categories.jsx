import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const advertisedCarData = ["Best Sedan", "Best SUVs", "Best EVs"];
  return (
    <div className='pt-20'>
      <h2 className='text-center text-3xl lg:text-4xl font-semibold mb-8'>
        Best Cars Categories
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {advertisedCarData?.map((card, i) => (
          <CategoryCard cardData={card} key={i}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;
