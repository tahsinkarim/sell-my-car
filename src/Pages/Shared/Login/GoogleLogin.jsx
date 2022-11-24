import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const GoogleLogin = () => {
  const { providerLogin } = useContext(AuthContext);

  //Google pop up
  const googleProvider = new GoogleAuthProvider();

  // Get previous location
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  //Google log in
  const handleGoogleLogin = () => {
    providerLogin(googleProvider)
      .then((res) => {
        const user = res.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div className='divider'></div>
      <button
        onClick={handleGoogleLogin}
        className='btn border-none bg-blue-500 w-full max-w-xs rounded'
      >
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
