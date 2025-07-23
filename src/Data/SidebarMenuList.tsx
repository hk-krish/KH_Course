import { RouteList } from "../Constant";
import { MenuItem } from "../Types/Layout";

export const menuList: MenuItem[] | undefined = [
  { id: 1, icon: "home", active: false, title: "Dashboard", type: "link", url: RouteList.Dashboard },
  { id: 2, icon: "home", active: false, title: "Banner", type: "link", url: RouteList.Banner },
];
