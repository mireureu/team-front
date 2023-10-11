import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Auctionpost1 from "./pages/Auctionpost1";
import App from "./pages/App";
import Home from "./pages/Home";
import Register from "./pages/Register.js";
import Logout from "./pages/Logout";
import App from "./pages/App";
import Login from "./pages/login";
import Home from "./Home";
import Auctionpost from "./pages/Auctionpost";
import QnAboard from "./pages/QnAboard";
import AskPage from "./pages/Askpage";
import Post from "./pages/Post";

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
      {
        path: "Post",
        element: <Post />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
export default router;
