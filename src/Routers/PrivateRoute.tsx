import { Navigate, Outlet } from "react-router-dom";
import { RouteList } from "../Constant/RouteList";
import { useAppSelector } from "../ReduxToolkit/Hooks";

const PrivateRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to={RouteList.Dashboard} replace /> : <Outlet />;
};

export default PrivateRoute;
