import React from "react";
import bmw from "../../../../assets/images/bmw-car-png-2089.png";
import ferrari from "../../../../assets/images/ferrari-logo-icon-png-17822.png";
import ford from "../../../../assets/images/ford-logo-icon-png-14196.png";
import honda from "../../../../assets/images/honda-g18184992b_640.png";
import mer from "../../../../assets/images/mercedes-benz-logo-png-11321.png";
import toyota from "../../../../assets/images/toyota-logo-png-20191.png";

const Partners = () => {
  return (
    <div className='max-w-7xl mx-auto mb-20 pt-28'>
      <div className=' text-center text-3xl font-semibold'>
        Our trusted Partners
      </div>
      <div>
        <div className='grid grid-cols-3 sm:grid-cols-6'>
          <div>
            <img className='p-5' src={bmw} alt='' />
          </div>
          <div>
            <img src={ford} alt='' />
          </div>
          <div>
            <img className='p-2' src={ferrari} alt='' />
          </div>
          <div>
            <img className='pt-4' src={honda} alt='' />
          </div>
          <div>
            <img src={mer} alt='' />
          </div>
          <div>
            <img src={toyota} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
