import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
};

export default DashboardLayout;
