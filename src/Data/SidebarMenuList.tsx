import { RouteList } from "../Constant";
import { MenuItem } from "../Types/Layout";

export const menuList: MenuItem[] | undefined = [
  { id: 1, icon: "home", active: false, title: "Dashboard", type: "link", url: RouteList.Dashboard },
  { id: 2, icon: "home", active: false, title: "Banner", type: "link", url: RouteList.Banner },
  { id: 3, icon: "home", active: false, title: "Category", type: "link", url: RouteList.Category },
  { id: 4, icon: "home", active: false, title: "Course", type: "link", url: RouteList.Course },
  { id: 5, icon: "home", active: false, title: "Students", type: "link", url: RouteList.Students },
  { id: 6, icon: "home", active: false, title: "Lecture", type: "link", url: RouteList.Lecture.Lecture },
  { id: 7, icon: "home", active: false, title: "Document", type: "link", url: RouteList.Document },
  { id: 8, icon: "home", active: false, title: "Faq", type: "link", url: RouteList.FAQ },
  { id: 9, icon: "home", active: false, title: "Blog", type: "link", url: RouteList.Blog },
  { id: 10, icon: "home", active: false, title: "LatestNews", type: "link", url: RouteList.LatestNews },
];
