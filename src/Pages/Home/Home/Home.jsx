import React from "react";
import Helmet from "react-helmet";
import AdvertisedItems from "../Sections/AdvertisedItems/AdvertisedItems";
import Banner from "../Sections/Banner/Banner";
import Categories from "../Sections/Categories/Categories";
import Partners from "../Sections/Partners/Partners";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>SellMyCar | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className='max-w-7xl mx-auto px-8'>
        <AdvertisedItems></AdvertisedItems>
        <Categories></Categories>
        <Partners></Partners>
      </div>
    </div>
  );
};

export default Home;
