import { Fragment, useState } from "react";
import { menuList } from "../../../Data/SidebarMenuList";
import { MenuItem } from "../../../Types/Layout";
import SubMenu from "./SubMenu";

const MenuList = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem[]>([]);

  return (
    <Fragment>
      <SubMenu menu={menuList} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={0} />
    </Fragment>
  );
};

export default MenuList;
