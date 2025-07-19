
//others

import { RouteList } from "../Constant/RouteList";
import Dashboard from "../Pages/Dashboard";

export const AppRoutes = [
  //Product
  { path: RouteList.Home, element: <Dashboard /> },
  { path: RouteList.Dashboard, element: <Dashboard /> },
];
