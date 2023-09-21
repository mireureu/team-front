import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Logout from "./pages/Logout";
import Auctionpost from "./pages/Auctionpost1";
import Auctionpost1 from "./pages/Auctionpost1";
import App from "./pages/App";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
        
            },{
              path:"/auction",
              element:<Auctionpost1 />

            },{
              path:"/detail",
              element:<App/>
            }
          

    ]
    },
    {
        path:"/logout",
        element:<Logout />
    }
]);
export default router;


