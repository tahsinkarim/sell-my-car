import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useToken from "../../../hooks/useToken";

const GoogleLogin = () => {
  const { providerLogin } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);

  //Google pop up
  const googleProvider = new GoogleAuthProvider();

  // Get previous location
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  if (token) {
    navigate(from, { replace: true });
  }

  //Google log in
  const handleGoogleLogin = () => {
    providerLogin(googleProvider)
      .then((res) => {
        const user = res.user;
        console.log({
          user: user.displayName,
          role: "buyer",
          email: user.email,
        });
        saveUser(user.displayName, "buyer", user.email);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveUser = (displayName, role, email) => {
    const userInfo = {
      user: displayName,
      role,
      email,
      verified: false,
    };

    fetch(`https://sell-my-car-server.vercel.app/users/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };
  return (
    <div className='w-full max-w-xs'>
      <div className='divider'></div>
      <button
        onClick={handleGoogleLogin}
        className='btn border-none bg-blue-500 hover:bg-blue-600 w-full max-w-xs rounded'
      >
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
