import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import Layout from "../Layout";
import PrivateRoute from "./PrivateRoute";
import RouteRedirect from "./RouteRedirect";
import { RouteList } from "../Constant/RouteList";
import Login from "../Pages/Auth/Login";

const RoutersComponent = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      { path: RouteList.Home, element: <Login />, index: true },
      { path: RouteList.Login, element: <Login /> },
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
