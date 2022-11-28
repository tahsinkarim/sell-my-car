import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardSideBar = ({ isRole }) => {
  return (
    <div className='drawer drawer-mobile'>
      <input id='dashboardSideBar' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content px-4 sm:px-8 bg-base-200 pt-8'>
        <Outlet></Outlet>
      </div>
      <div className='drawer-side'>
        <label htmlFor='dashboardSideBar' className='drawer-overlay'></label>
        <ul className='menu p-4 w-80 bg-gray-800 text-white font-bold'>
          <li>
            <Link
              className='btn btn-primary mb-2 rounded-lg'
              to='/dashboard/myOrders'
            >
              My Orders
            </Link>
          </li>
          {isRole === "seller" && (
            <>
              <li>
                <Link
                  className='btn btn-primary mb-2 rounded-lg'
                  to='/dashboard/addProduct'
                >
                  Add a Product
                </Link>
              </li>
              <li>
                <Link
                  className='btn btn-primary mb-2 rounded-lg'
                  to='/dashboard/myProducts'
                >
                  My Products
                </Link>
              </li>
            </>
          )}
          {isRole === "admin" && (
            <>
              <li>
                <Link
                  className='btn btn-primary mb-2 rounded-lg'
                  to='/dashboard/allSellers'
                >
                  All Sellers
                </Link>
              </li>
              <li>
                <Link
                  className='btn btn-primary mb-2 rounded-lg'
                  to='/dashboard/allBuyers'
                >
                  All Buyers
                </Link>
              </li>
              <li>
                <Link
                  className='btn btn-primary mb-2 rounded-lg'
                  to='/dashboard/reportedItems'
                >
                  Reported Items
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBar;
