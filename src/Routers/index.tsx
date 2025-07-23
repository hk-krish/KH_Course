import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import Layout from "../Layout";
import { RouteList } from "../Constant/RouteList";
import Login from "../Pages/Auth/Login";
import Otp from "../Pages/Auth/Otp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import RouteRedirect from "./RouteRedirect";

const RoutersComponent = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      { path: RouteList.Home, element: <Login />, index: true },
      { path: RouteList.Login, element: <Login /> },
      { path: RouteList.Otp, element: <Otp /> },
      { path: RouteList.ResetPassword, element: <ResetPassword /> },
    ],
  },
  {
    element: <RouteRedirect />,
    children: [
      {
        element: <Layout />,
        children: AppRoutes,
      },
    ],
  },
  // { path: "*", element: <Error404 /> },
]);

export default RoutersComponent;
