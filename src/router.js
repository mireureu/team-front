import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Logout from "./pages/Logout";
import App from "./pages/App";
import Home from "./Home";
import Auctionpost from "./pages/Auctionpost";
import QnAboard from "./pages/QnAboard";
import AskPage from "./pages/Askpage";

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
        path: "/detail",
        element: <App />,
      },
      {
        path: "/Auctionpost",
        element: <Auctionpost />,
      },
      {
        path: "qnapost",
        element: <QnAboard />,
      },
      {
        path: "AskPage",
        element: <AskPage />,
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
export default router;
