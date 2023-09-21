import { createBrowserRouter } from "react-router-dom";
import Auctionpost1 from "./pages/Auctionpost1";
import Layout from "./components/Layout";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auctionpost1",
    element: <Auctionpost1 />,
  },
]);

export default router;
