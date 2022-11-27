import React, { useContext } from "react";
import { useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const DisplayError = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const error = useRouteError();

  return (
    <div>
      <p className='text-red-500'>Something went wrong</p>
      <p className='text-red-500'>{error.status || error.message}</p>
      <h3>
        Please{" "}
        <button onClick={handleLogout} className='btn btn-primary'>
          Log out
        </button>{" "}
        and Sign in again
      </h3>
    </div>
  );
};

export default DisplayError;
