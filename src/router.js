import Register from "./pages/register";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Auctionpost1 from "./pages/Auctionpost1";
import App from "./pages/App";
// import Home from "./pages/Home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            // {
            //     index: true,
            //     element:<Home/>
            // },
            {
              path:"/auction",
              element:<Auctionpost1 />

            },{
              path:"/detail",
              element:<App/>
            }
          

    ]
    },
    {
        path:"/login",
        element:<Login />
    },
    {
      path:"/register",
      element:<Register />
    }
    
]);
export default router;


