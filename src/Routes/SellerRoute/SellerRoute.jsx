import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isRole, isRoleLoading] = useRole(user?.email);
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <p>Loading . .</p>;
  }

  if ((user && isRole === "admin") || (user && isRole === "seller")) {
    return children;
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
