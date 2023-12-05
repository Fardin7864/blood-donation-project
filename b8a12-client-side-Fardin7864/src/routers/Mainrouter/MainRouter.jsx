import { createBrowserRouter } from "react-router-dom";
import Root from "../../Root";
import Error from "../../pages/Error/Error";
import Home from "../../pages/Home/Home/Home";
import Search from "../../pages/Search/Search";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import DashboardHome from "../../pages/Dashboard/Home/DashboardHome";
import Profile from "../../pages/Dashboard/Profile/profile";
import BloodRequest from "../../pages/Dashboard/BloodRequest/BloodRequest";
import MyDonations from "../../pages/Dashboard/MyDonations/MyDonations";
import AllUsers from "../../pages/Dashboard/Admin/AllUsers/AllUsers";
import AllRequests from "../../pages/Dashboard/Admin/AllRequests/AllRequests";
import RequestForm from "../../pages/Dashboard/components/RequestForm";
import Allrequests from "../../pages/AllRequests/Allrequests";
import RequestDetails from "../../pages/RequestDetails/RequestDetails";
import ContentManagement from "../../pages/Dashboard/Admin/ContentManagement/ContentManagement";
import AddBlog from "../../pages/Dashboard/Admin/AddBlog/AddBlog";
import PrivetRout from "../Privet/PrivetRout";
import Adminroute from "../AdminRoute/Adminroute";
import Funding from "../../pages/Funding/Funding";
import Blog from "../../pages/Blog/Blog";

const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path:'search',
                element: <Search/>
            },
            {
                path: 'login',
                element:<Login/>
            },
            {
                path: 'signup',
                element: <Signup/>
            },
            {
                path: 'donation-request',
                element: <Allrequests/>
            },
            {
                path: 'donation-details/:id',
                element: <PrivetRout><RequestDetails/></PrivetRout>,
                loader: ({params}) => fetch(`https://blood-connect-final.vercel.app/api/v1/request/${params.id}`)
                // loader: ({params}) => fetch(`http://localhost:5000/api/v1/request/${params.id}`)
            },
            {
                path: 'funding',
                element:<PrivetRout><Funding/></PrivetRout>
            },
            {
                path: 'blog',
                element:<Blog/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRout><Dashboard></Dashboard></PrivetRout>,
        children: [
            {
                path: '/dashboard',
                element: <PrivetRout><DashboardHome/></PrivetRout>
            },
            {
                path: '/dashboard/profile',
                element: <PrivetRout><Profile/></PrivetRout>
            },
            {
                path: '/dashboard/create-donation-request',
                element: <PrivetRout><BloodRequest/></PrivetRout>
            },
            {
                path: '/dashboard/my-donation-requests',
                element: <PrivetRout><MyDonations/></PrivetRout>
            },
            {
                path: '/dashboard/all-user',
                element: <Adminroute><AllUsers/></Adminroute>
            },
            {
                path: '/dashboard/all-blood-donation-request',
                element: <PrivetRout><AllRequests/></PrivetRout>
            },
            {
                path: '/dashboard/update-request/:id',
                element: <PrivetRout><RequestForm/></PrivetRout>,
                loader: ({params}) => fetch(`https://blood-connect-final.vercel.app/api/v1/request/${params.id}`)
                // loader: ({params}) => fetch(`http://localhost:5000/api/v1/request/${params.id}`)
            },
            {
                path: '/dashboard/content-management',
                element: <PrivetRout><ContentManagement/></PrivetRout>
            },
            {
                path: '/dashboard/content-management/add-blog',
                element: <PrivetRout><AddBlog/></PrivetRout>
            }
        ]
    }
])


export default MainRouter;