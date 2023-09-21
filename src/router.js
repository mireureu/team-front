import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Logout from "./pages/Logout";
import Auctionpost1 from "./pages/Auctionpost1";
import App from "./pages/App";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auction",
        element: <Auctionpost1 />,
      },
      {
        path: "/detail",
        element: <App />,
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
export default router;
