import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
// import Logout from "./pages/Logout";
import AuctionDetail from "./pages/AuctionDetail";
import Login from "./pages/login";
import Home from "./pages/Home";
import Auctionpost from "./pages/Auctionpost";
import QnAboard from "./pages/QnAboard";
import AskPage from "./pages/Askpage";
import Post from "./pages/Post";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import UserPage from "./pages/UserPage";
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
        path: "/AuctionDetail",
        element: <AuctionDetail />,
      },
      {
        path: "/Auctionpost/:auctionNo",
        element: <Auctionpost />,
      },
      {
        path: "/qnapost",
        element: <QnAboard />,
      },
      // {
      //   path: "/AskPage",
      //   element: <AskPage />,
      // },
      {
        path: "/Post",
        element: <Post />,
      },
      {
        path: "/SearchResult",
        element: <SearchResult />,
      },
      {
        path: "/UserPage",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/logout",
  //   element: <Logout />,
  // },
]);
export default router;
