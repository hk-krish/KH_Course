import { RouterProvider } from "react-router-dom";
import RoutersComponent from "./Routers";
import { Fragment } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Fragment>
      <RouterProvider router={RoutersComponent} />
      <ToastContainer />
    </Fragment>
  );
}

export default App;
