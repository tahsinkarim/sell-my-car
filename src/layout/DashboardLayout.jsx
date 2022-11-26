import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import useRole from "../hooks/useRole";
import DashboardSideBar from "../Pages/Shared/DashboardSideBar/DashboardSideBar";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isRole] = useRole(user?.email);
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
      <DashboardSideBar isRole={isRole}></DashboardSideBar>
    </>
  );
};

export default DashboardLayout;
