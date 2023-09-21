import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Logout from "./pages/Logout";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
    //     children: [
    //         {
    //             index: true,
    //             element: <App/>
    //         },
            
    //         {
    //         path: "watch", element: <Watch/>
    //         }, 

    // ]
    },
    {
        path:"/logout",
        element:<Logout />
    }
]);
export default router;


