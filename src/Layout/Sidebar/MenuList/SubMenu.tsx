/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuItem, MenuListProps } from "../../../Types/Layout";
import { Href } from "../../../Constant";
import SvgIcon from "../../../CoreComponents/SvgIcon";


const SubMenu: React.FC<MenuListProps> = ({ menu, setActiveMenu, activeMenu, level }) => {
  const location = useLocation();

  const ActiveNavLinkUrl = (path?: string) => {
    return location.pathname === path ? true : "";
  };
  const shouldSetActive = ({ item }: { item: MenuItem }): boolean => {
    var returnValue = false;
    if (item?.url === location.pathname) {
      returnValue = true;
    }
    if (!returnValue && item?.menu) {
      item?.menu.every((subItem: MenuItem) => {
        returnValue = shouldSetActive({ item: subItem });
        return !returnValue;
      });
    }
    return returnValue;
  };
  useEffect(() => {
    menu?.forEach((item) => {
      let gotValue = shouldSetActive({ item });
      if (gotValue) {
        let temp = [...activeMenu];
        temp[level] = item;
        setActiveMenu(temp);
      }
    });
  }, []);
  return (
    <Fragment>
      {menu?.map((item, i) => (
        <li key={i} className={`${level === 0 ? "sidebar-list" : ""}  ${(item.menu ? item.menu.map((innerItem) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || activeMenu[level]?.title === item.title ? "active" : ""}`}>
          <Link
            className={`${level === 0 ? "sidebar-link sidebar-title" : ""} ${(item.menu ? item.menu.map((innerItem) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || activeMenu[level]?.title === item.title ? "active" : ""}`}
            to={item.url ? item.url : Href}
            onClick={() => {
              const temp = [...activeMenu];
              temp[level] = temp[level]?.title !== item.title ? item : {} as MenuItem; // store full object
              setActiveMenu(temp);
            }}>
            {item.icon && <SvgIcon className={`stroke-icon`} iconId={`stroke-${item.icon}`} />}
            {level === 0 ? <span>{`${item.title}`}</span> : `${item.title}`}
            {item.menu && <div className="according-menu">{activeMenu[level]?.title === item.title ? <i className="fa fa-angle-down" /> : <i className="fa fa-angle-right" />}</div>}
          </Link>
          {item.menu && (
            <ul className={level !== 0 ? "submenu-content open-sub-mega-menu" : "sidebar-submenu"}
              style={{display: `${(item.menu ? item.menu.map((innerItem) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || activeMenu[level]?.title === item.title ? "block" : "none"}`}}>
              <SubMenu menu={item.menu} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={level + 1} />
            </ul> 
          )}
        </li>
      ))}
    </Fragment>
  );
};
export default SubMenu;
