import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { MenuList } from "../../Data/SidebarMenuList";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { toggleSidebar } from "../../ReduxToolkit/Slice/LayoutSlice";

const Sidebar = () => {
  const { sideBarToggle } = useAppSelector((state) => state.layout);

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  return (
    <div className={`sidebar-wrapper ${sideBarToggle ? "close_icon" : ""}`}>
      <div>
        <div className="logo-wrapper logo-wrapper-center">
          <a href="index.html">
            <img className="img-fluid for-white" src="assets/images/logo/full-white.svg" alt="logo" />
          </a>
          <div className="back-btn" onClick={() => dispatch(toggleSidebar())}>
            <i className="fa fa-angle-left" />
          </div>
          <div className="toggle-sidebar">
            <i className="ri-apps-2-line status_toggle middle sidebar-toggle" onClick={() => dispatch(toggleSidebar())} />
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <a href="index.html">
            <img className="img-fluid main-logo" src="assets/images/logo/logo.png" alt="logo" />
          </a>
        </div>
        <nav className="sidebar-main">
          <div className="left-arrow" id="left-arrow">
            <i data-feather="arrow-left" />
          </div>
          <div id="sidebar-menu">
            <ul className="sidebar-links" id="simple-bar">
              <SimpleBar style={{ width: "68px", height: "350px" }}>
                <li className="back-btn" />
                {MenuList?.map((item, index) => (
                  <li className="sidebar-list" key={index}>
                    <Link className={`sidebar-link sidebar-title link-nav ${pathname === item?.url ? "active" : ""}`} to={item?.url}>
                      <i className={item?.icon} />
                      <span>{item?.title}</span>
                    </Link>
                  </li>
                ))}
              </SimpleBar>
            </ul>
          </div>
          <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
