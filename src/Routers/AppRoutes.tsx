import { RouteList } from "../Constant/RouteList";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Banner from "../Pages/Banner";
import Dashboard from "../Pages/Dashboard";

export const AppRoutes = [
  { path: RouteList.Dashboard, element: <Dashboard /> },
  { path: RouteList.Banner, element: <Banner /> },
  { path: RouteList.ChangePassword, element: <ChangePassword /> },
];
