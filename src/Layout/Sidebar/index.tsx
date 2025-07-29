import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
// import { MenuList } from "../../Data/SidebarMenuList";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { toggleSidebar } from "../../ReduxToolkit/Slice/LayoutSlice";
import { RouteList } from "../../Constant/RouteList";
import { dynamicImage } from "../../Utils";
import { Image } from "../../CoreComponents/Image";
import SvgIcon from "../../CoreComponents/SvgIcon";
import MenuList from "./MenuList";

const Sidebar = () => {
  const { sideBarToggle } = useAppSelector((state) => state.layout);

  const dispatch = useAppDispatch();
  return (
    <>
      <div className={`sidebar-wrapper ${sideBarToggle ? "close_icon" : ""}`} data-layout="stroke-svg">
        <div>
          <div className="logo-wrapper">
            <Link to={RouteList.Dashboard}>
              {/* <Image className="img-fluid for-light" src={dynamicImage(`logo/logo.png`)} alt="" /> */}
              <h2>HK Course</h2>
            </Link>
            <div className="toggle-sidebar" onClick={() => dispatch(toggleSidebar())}>
              <SvgIcon className="sidebar-toggle" iconId="toggle-icon" />
            </div>
          </div>
          <div className="logo-icon-wrapper">
            <Link to={RouteList.Dashboard}>
              <h2>HK</h2>
              {/* <Image className="img-fluid" src={dynamicImage(`logo/logo-icon.png`)} alt="" /> */}
            </Link>
          </div>
          <nav className="sidebar-main">
            <div id="sidebar-menu">
              <ul className="sidebar-links custom-scrollbar" id="simple-bar">
                <div className="simplebar-wrapper">
                  <div className="simplebar-mask">
                    <div className="simplebar-offset">
                      <div className="simplebar-content-wrapper">
                        <div className="simplebar-content">
                          <li className="back-btn">
                            <Link to={RouteList.Dashboard}>
                              <Image className="img-fluid" src={dynamicImage(`logo/logo-icon.png`)} alt="" />
                            </Link>
                            <div className="mobile-back text-end">
                              <span>Back </span>
                              <i className="fa fa-angle-right ps-2" />
                            </div>
                          </li>
                          {/* <li className={`pin-title sidebar-main-title ${pinedMenu.length > 0 ? "show" : ""} `}>
                            <div>
                              <h6>Pinned</h6>
                            </div>
                          </li> */}
                          <MenuList />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
    // <div className={`sidebar-wrapper ${sideBarToggle ? "close_icon" : ""}`}>
    //   <div>
    //     <div className="logo-wrapper logo-wrapper-center">
    //       <Link to={RouteList.Home}>
    //         {/* <img className="img-fluid for-white" src="assets/images/logo/full-white.svg" alt="logo" /> */}
    //         <h2>HK Course</h2>
    //       </Link>
    //       <div className="back-btn" onClick={() => dispatch(toggleSidebar())}>
    //         <i className="fa fa-angle-left" />
    //       </div>
    //       <div className="toggle-sidebar">
    //         <i className="ri-apps-2-line status_toggle middle sidebar-toggle" onClick={() => dispatch(toggleSidebar())} />
    //       </div>
    //     </div>
    //     <div className="logo-icon-wrapper">
    //       <Link to={RouteList.Home}>
    //         <img className="img-fluid main-logo" src="assets/images/logo/logo.png" alt="logo" />
    //       </Link>
    //     </div>
    //     <nav className="sidebar-main">
    //       <div className="left-arrow" id="left-arrow">
    //         <i data-feather="arrow-left" />
    //       </div>
    //       <div id="sidebar-menu">
    //         <ul className="sidebar-links" id="simple-bar">
    //           <SimpleBar style={{ width: "68px", height: "350px" }}>
    //             <li className="back-btn" />
    //             {MenuList?.map((item, index) => (
    //               <li className="sidebar-list" key={index}>
    //                 <Link className={`sidebar-link sidebar-title link-nav ${pathname === item?.url ? "active" : ""}`} to={item?.url}>
    //                   <i className={item?.icon} />
    //                   <span>{item?.title}</span>
    //                 </Link>
    //               </li>
    //             ))}
    //           </SimpleBar>
    //         </ul>
    //       </div>
    //       <div className="right-arrow" id="right-arrow">
    //         <i data-feather="arrow-right" />
    //       </div>
    //     </nav>
    //   </div>
    // </div>
  );
};

export default Sidebar;
