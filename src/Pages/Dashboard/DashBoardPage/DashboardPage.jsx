import React, { useContext } from "react";
import Helmet from "react-helmet";
import { AuthContext } from "../../../contexts/AuthProvider";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className='text-3xl'>
        Welcome to your Dashboard {user?.displayName}
      </h1>
      <div className='my-6'>
        <p className='font-semibold text-lg'>Profile Info</p>
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
      </div>
      <div>
        <p>
          View your dashboard pages in
          <label
            className='hover:underline text-primary ml-1'
            htmlFor='dashboardSideBar'
          >
            dashboard menu.
          </label>
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
