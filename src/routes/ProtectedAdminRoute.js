import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  // const role = user?.role;
  const role = "admin"; // Thêm dòng này để test

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
