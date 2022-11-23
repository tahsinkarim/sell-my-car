import React from "react";
import AdvertisedItems from "../Sections/AdvertisedItems/AdvertisedItems";
import Banner from "../Sections/Banner/Banner";
import Categories from "../Sections/Categories/Categories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className='max-w-7xl mx-auto px-8'>
        <AdvertisedItems></AdvertisedItems>
        <Categories></Categories>
      </div>
    </div>
  );
};

export default Home;
