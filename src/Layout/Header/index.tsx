import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, NavLink, Row } from "reactstrap";
import { Href } from "../../Constant";
import { RouteList } from "../../Constant/RouteList";
import { Image } from "../../CoreComponents/Image";
import SvgIcon from "../../CoreComponents/SvgIcon";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { logout } from "../../ReduxToolkit/Slice/AuthSlice";
import { toggleSidebar } from "../../ReduxToolkit/Slice/LayoutSlice";
import { dynamicImage } from "../../Utils";
import { Maximize2 } from "iconsax-react";

const Header = () => {
  const { sideBarToggle } = useAppSelector((state) => state.layout);
  const { user } = useAppSelector((state) => state.auth);
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) document.documentElement.requestFullscreen();
    else document?.exitFullscreen();
  };
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={`page-header ${sideBarToggle ? "close_icon" : ""}`}>
        <Row className="header-wrapper m-0">
          <Col className="header-logo-wrapper col-auto p-0">
            <div className="logo-wrapper">
              <Link to={RouteList.Dashboard}>
                <Image className="img-fluid for-light" src={dynamicImage(`logo/logo.png`)} alt="" />
              </Link>
            </div>
            <div className="toggle-sidebar" onClick={() => dispatch(toggleSidebar())}>
              <SvgIcon className="sidebar-toggle" iconId="stroke-animation" />
            </div>
          </Col>
          <Col xs="auto" lg="7" md="6" className="nav-right box-col-6 pull-right right-header p-0 ms-auto">
            <ul className="nav-menus">
              <li onClick={() => fullScreenHandler(!fullScreen)}>
                <NavLink href={Href}>
                  <Maximize2 />
                </NavLink>
              </li>
              <li className="profile-nav onhover-dropdown p-0 m-0">
                <div className="d-flex profile-media align-items-center">
                  <Image className="b-r-6 img-40" src={user?.user?.profilePhoto ? user?.user?.profilePhoto : dynamicImage(`user/user.png`)} alt="profile" />
                  <div className="flex-grow-1">
                    <span>
                      {user?.user?.firstName} {user?.user?.lastName}
                    </span>
                    <p className="mb-0 text-capitalize">
                      {user?.user?.userType}
                      <SvgIcon iconId="header-arrow-down" />
                    </p>
                  </div>
                </div>
                <ul className="profile-dropdown onhover-show-div">
                  <li>
                    <Link to={RouteList.ChangePassword}>
                      <span>Change Password</span>
                    </Link>
                  </li>
                  <li onClick={() =>  dispatch(logout())}>
                    <Link to={Href}>
                      <span>LogOut</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      {/* <div className={`page-header ${sideBarToggle ? "close_icon" : ""}`}>
      <div className="header-wrapper m-0">
        <div className="header-logo-wrapper p-0">
          <div className="logo-wrapper">
            <Link to={RouteList.Home}>
              <img className="img-fluid main-logo" src="assets/images/logo/1.png" alt="logo" />
              <img className="img-fluid white-logo" src="assets/images/logo/1-white.png" alt="logo" />
            </Link>
          </div>
          <div className="toggle-sidebar">
            <AlignCenter className="status_toggle middle sidebar-toggle" onClick={() => dispatch(toggleSidebar())} />
            <Link to={RouteList.Home}>
              <img className="img-fluid for-light" src="assets/images/logo/1.png" alt="logo" />
              <img className="img-fluid for-dark" src="assets/images/logo/1-white.png" alt="logo" />
            </Link>
          </div>
        </div>
        <div className="nav-right col-xl-6 col-5 pull-right right-header p-0">
          <ul className="nav-menus">
            <li className="profile-nav onhover-dropdown pe-0 me-0">
              <div className="media profile-media">
                <img className="user-profile rounded-circle" src="assets/images/users/4.jpg" alt="" />
                <div className="user-name-hide media-body">
                  <span>Emay Walter</span>
                  <p className="mb-0 font-roboto">
                    Admin
                    <i className="middle ri-arrow-down-s-line" />
                  </p>
                </div>
              </div>
              <ul className="profile-dropdown onhover-show-div">
                <li>
                  <Link to={RouteList.ChangePassword}>
                    <Settings/>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li onClick={() =>  dispatch(logout())}>
                  <a href={Href}>
                    <LogOut/>
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Header;
