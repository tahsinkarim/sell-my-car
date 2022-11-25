import React from "react";
import DashboardSideBar from "../Pages/Shared/DashboardSideBar/DashboardSideBar";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className='drawer-content flex flex-col items-end mr-4 my-4'>
        <label
          htmlFor='dashboardSideBar'
          className='btn btn-primary btn-sm drawer-button lg:hidden'
        >
          Dashboard Menu
        </label>
      </div>
      <DashboardSideBar></DashboardSideBar>
    </>
  );
};

export default DashboardLayout;
