import { Navigate, Outlet } from "react-router-dom";
import { RouteList } from "../Constant/RouteList";
import { useAppSelector } from "../ReduxToolkit/Hooks";

const RouteRedirect = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return !isAuthenticated ? <Navigate to={RouteList.Login} replace /> : <Outlet />;
};

export default RouteRedirect;
