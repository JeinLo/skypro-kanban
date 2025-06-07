import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ isAuth }) {
  console.log("PrivateRoute check:", { isAuth });
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
