import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardSideBar = ({ isRole }) => {
  return (
    <div className='drawer drawer-mobile'>
      <input id='dashboardSideBar' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content mx-4 sm:mx-8'>
        <Outlet></Outlet>
      </div>
      <div className='drawer-side'>
        <label htmlFor='dashboardSideBar' className='drawer-overlay'></label>
        <ul className='menu p-4 w-80 bg-base-100 text-base-content'>
          <li>
            <Link to='/dashboard/myOrders'>My Orders</Link>
          </li>
          {isRole === "seller" && (
            <>
              <li>
                <Link to='/dashboard/addProduct'>Add a Product</Link>
              </li>
              <li>
                <Link to='/dashboard/myProducts'>My Products</Link>
              </li>
            </>
          )}
          {isRole === "admin" && (
            <>
              <li>
                <Link to='/dashboard/allSellers'>All Sellers</Link>
              </li>
              <li>
                <Link to='/dashboard/allBuyers'>All Buyers</Link>
              </li>
              <li>
                <Link to='/dashboard/reportedItems'>Reported Items</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBar;
