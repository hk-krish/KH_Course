import { RouterProvider } from "react-router-dom";
import RoutersComponent from "./Routers";
import { Fragment } from "react/jsx-runtime";

function App() {
  return (
    <Fragment>
      <RouterProvider router={RoutersComponent} />
    </Fragment>
  );
}

export default App;
