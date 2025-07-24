import { RouteList } from "../Constant/RouteList";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Banner from "../Pages/Banner";
import Dashboard from "../Pages/Dashboard";
import Category from "../Pages/Category";
import Course from "../Pages/Course";
import Students from "../Pages/Students";
import Lecture from "../Pages/Lecture";

export const AppRoutes = [
  { path: RouteList.Dashboard, element: <Dashboard /> },
  { path: RouteList.Banner, element: <Banner /> },
  { path: RouteList.ChangePassword, element: <ChangePassword /> },
  { path: RouteList.Category, element: <Category /> },
  { path: RouteList.Course, element: <Course /> },
  { path: RouteList.Students, element: <Students /> },
  { path: RouteList.Lecture, element: <Lecture /> },
];
