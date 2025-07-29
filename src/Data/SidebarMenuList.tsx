import { RouteList } from "../Constant";
import { MenuItem } from "../Types/Layout";

export const menuList: MenuItem[] | undefined = [
  { id: 1, icon: "home", active: false, title: "Dashboard", type: "link", url: RouteList.Dashboard },
  { id: 2, icon: "gallery", active: false, title: "Banner", type: "link", url: RouteList.Banner },
  { id: 3, icon: "widget", active: false, title: "Category", type: "link", url: RouteList.Category },
  { id: 4, icon: "sample-page", active: false, title: "Course", type: "link", url: RouteList.Course },
  { id: 5, icon: "user", active: false, title: "Students", type: "link", url: RouteList.Students },
  { id: 6, icon: "button", active: false, title: "Lecture", type: "link", url: RouteList.Lecture.Lecture },
  { id: 7, icon: "file", active: false, title: "Document", type: "link", url: RouteList.Document },
  { id: 8, icon: "faq", active: false, title: "Faq", type: "link", url: RouteList.FAQ },
  { id: 9, icon: "blog", active: false, title: "Blog", type: "link", url: RouteList.Blog },
  { id: 10, icon: "bonus-kit", active: false, title: "LatestNews", type: "link", url: RouteList.LatestNews },
  { id: 11, icon: "chat", active: false, title: "Chats", type: "link", url: RouteList.Chats },
];
