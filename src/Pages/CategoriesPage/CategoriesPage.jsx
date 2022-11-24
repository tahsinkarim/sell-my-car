import React from "react";
import { useLoaderData } from "react-router-dom";
import CategoryPageCard from "./CategoryPageCard";

const CategoriesPage = () => {
  const categoryCars = useLoaderData();
  return (
    <div className='max-w-7xl mx-auto px-8'>
      <div>
        {categoryCars.map((car) => (
          <CategoryPageCard car={car} key={car._id}></CategoryPageCard>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
