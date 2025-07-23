import { useEffect } from "react";
import { useAppDispatch } from "../ReduxToolkit/Hooks";
import { setSideBarToggle } from "../ReduxToolkit/Slice/LayoutSlice";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const dispatch = useAppDispatch();
  const updateSidebarBasedOnWidth = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1200) dispatch(setSideBarToggle(true));
    else dispatch(setSideBarToggle(false));
  };
  useEffect(() => {
    updateSidebarBasedOnWidth();
    window.addEventListener("resize", () => updateSidebarBasedOnWidth());
  }, []);

  return (
    <div className="page-wrapper compact-wrapper">
      <Header />
      <div className="page-body-wrapper">
        <Sidebar />
        <div className="page-body">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
