import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1 className='text-3xl'>
        Welcome to your Dashboard {user?.displayName}
      </h1>
      <div className='my-6'>
        <p className='font-semibold text-lg'>Profile Info</p>
        <p>Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default DashboardPage;
