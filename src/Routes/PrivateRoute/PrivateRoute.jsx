import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading ...
      </div>
    );
  }
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
