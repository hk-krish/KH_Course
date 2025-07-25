import { RouteList } from "../Constant/RouteList";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Banner from "../Pages/Banner";
import Category from "../Pages/Category";
import Course from "../Pages/Course";
import Dashboard from "../Pages/Dashboard";
import Lecture from "../Pages/Lecture";
import CourseLecture from "../Pages/Lecture/CourseLecture";
import Students from "../Pages/Students";

export const AppRoutes = [
  { path: RouteList.Dashboard, element: <Dashboard /> },
  { path: RouteList.Banner, element: <Banner /> },
  { path: RouteList.ChangePassword, element: <ChangePassword /> },
  { path: RouteList.Category, element: <Category /> },
  { path: RouteList.Course, element: <Course /> },
  { path: RouteList.Students, element: <Students /> },
  { path: RouteList.Lecture.Lecture, element: <Lecture /> },
  { path: RouteList.Lecture.CourseLecture, element: <CourseLecture /> },
];
