import { AlignCenter } from "react-feather";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { toggleSidebar } from "../../ReduxToolkit/Slice/LayoutSlice";

const Header = () => {
  const { sideBarToggle } = useAppSelector((state) => state.layout);

  const dispatch = useAppDispatch();

  return (
    <div className={`page-header ${sideBarToggle ? "close_icon" : ""}`}>
      <div className="header-wrapper m-0">
        <div className="header-logo-wrapper p-0">
          <div className="logo-wrapper">
            <a href="index.html">
              <img className="img-fluid main-logo" src="assets/images/logo/1.png" alt="logo" />
              <img className="img-fluid white-logo" src="assets/images/logo/1-white.png" alt="logo" />
            </a>
          </div>
          <div className="toggle-sidebar">
            <AlignCenter className="status_toggle middle sidebar-toggle" onClick={() => dispatch(toggleSidebar())} />
            <a href="index.html">
              <img className="img-fluid for-light" src="assets/images/logo/1.png" alt="logo" />
              <img className="img-fluid for-dark" src="assets/images/logo/1-white.png" alt="logo" />
            </a>
          </div>
        </div>
        <div className="welcome-title">
          <h5>
            Food that's you loved!
            <img src="./assets/images/header.gif" alt="" />
          </h5>
          <span>Delight your taste with our most famous food !!</span>
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
                  <a href="all-users.html">
                    <i data-feather="users" />
                    <span>Users</span>
                  </a>
                </li>
                <li>
                  <a href="order-list.html">
                    <i data-feather="archive" />
                    <span>Orders</span>
                  </a>
                </li>
                <li>
                  <a href="support-ticket.html">
                    <i data-feather="phone" />
                    <span>Spports Tickets</span>
                  </a>
                </li>
                <li>
                  <a href="profile-setting.html">
                    <i data-feather="settings" />
                    <span>Settings</span>
                  </a>
                </li>
                <li>
                  <a data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="javascript:void(0)">
                    <i data-feather="log-out" />
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
