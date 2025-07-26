import { RouteList } from "../Constant/RouteList";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Banner from "../Pages/Banner";
import Blog from "../Pages/Blog";
import Category from "../Pages/Category";
import Course from "../Pages/Course";
import Dashboard from "../Pages/Dashboard";
import Document from "../Pages/Document";
import Faq from "../Pages/Faq";
import LatestNews from "../Pages/LatestNews";
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
  { path: RouteList.Document, element: <Document /> },
  { path: RouteList.FAQ, element: <Faq /> },
  { path: RouteList.Blog, element: <Blog /> },
  { path: RouteList.LatestNews, element: <LatestNews /> },
];
