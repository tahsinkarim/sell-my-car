import { useQuery } from "@tanstack/react-query";
import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const { data: categoryCars = [] } = useQuery({
    queryKey: ["categoryCars"],
    queryFn: async () => {
      const res = await fetch("https://sell-my-car-server.vercel.app/category");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className='pt-28'>
      <h2 className='text-center text-3xl lg:text-4xl font-semibold mb-8'>
        Best Cars Categories
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {categoryCars?.map((car) => (
          <CategoryCard carData={car} key={car._id}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;
