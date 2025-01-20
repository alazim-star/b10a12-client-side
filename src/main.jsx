import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './MainLayOut/Mainlayout';
import Home from './Pages/Home/Home';

import AuthProvider from './AuthProvider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import Register from './Authentication/Register';
import Login from './Authentication/login';
import ScholarshipAdd from './Pages/DashBoard/Admin/ScholarshipAdd';
import AllScholarships from './ScholarShip/AllScholarships';
import ViewDetails from './Pages/ViewDetails';
import CheckOutFrom from './Payment/CheckOutForm';
import MyApplication from './Pages/DashBoard/User/MyApplication';
import Dashboard from './Pages/DashBoard/Dashboard';
import AdminProfile from './Pages/DashBoard/Admin/AdminProfile';
import PrivateRoute from './PrivetRoute/PrivateRoute';

import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import UserProfile from './Pages/DashBoard/User/UserProfile';
import ManageUsers from './Pages/DashBoard/Admin/ManageUsers';
import AdminRoutes from './Pages/DashBoard/Admin/AdminRoutes';
import ManageScholarships from './Pages/DashBoard/Admin/ManageScholarships';
import MyReview from './Pages/DashBoard/User/MyReview';
import ErrorPage from './ErrorPage/ErrorPage';
import MyProfileModerator from './Pages/DashBoard/Modaretor/MyProfileModerator';
import ManageReview from './Pages/DashBoard/Admin/ManageReview';
import ManageAppliedApplication from './Pages/DashBoard/Admin/ManageAppliedApplication';
import AllReviewsModerator from './Pages/DashBoard/Modaretor/AllReviewsModerator';
import AllAppliedScholarship from './Pages/DashBoard/Modaretor/AllAppliedScholarship';
import AddScholarshipModerator from './Pages/DashBoard/Modaretor/AddScholarshipModerator';
import Payment from './Payment/Payment';
import ModeratorRoutes from './Pages/DashBoard/Modaretor/ModeratorRoutes';
import CartBoard from './Pages/DashBoard/CartBoard';
import PaymentHistory from './Payment/PaymentHistory';




const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path: "/",
        element: <Home></Home>, 
      
      },
     
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allScholarship",
        element: <AllScholarships></AllScholarships>,
      },
      {
        path: "/viewDetails/:id",
        element: <ViewDetails></ViewDetails>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:5000/allScholarship`);
          const data = await res.json();
          const singleData = data.find(d => d._id === params.id);
          return singleData; 
        },
      },
      
      {
        path: "/checkOut",
        element: <CheckOutFrom></CheckOutFrom>,
      },

      {
        path: "dashboard",
        element: <PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute>,
        children:[

          
          {
            path: "cartBoard",
            element: <CartBoard></CartBoard>,
          },
         
// user dashboard 

          {
            path: "myApplication",
            element: <MyApplication></MyApplication>,
          },
         
          {
            path: "myProfile",
            element: <UserProfile></UserProfile>,
          },
          {
            path: "myReviews",
            element: <MyReview></MyReview>,
          },
          {
            path: "payment",
            element: <Payment></Payment>,
          },
          {
            path: "paymentHistory",
            element: <PaymentHistory></PaymentHistory>,
          },

// admin dashboard
{
  path: "addScholarshipAdmin",
  element: <AdminRoutes>
    <ScholarshipAdd></ScholarshipAdd>
  </AdminRoutes>,
},
{
  path: "manageUsers",
  element: <AdminRoutes>
    <ManageUsers></ManageUsers>
  </AdminRoutes>,
},
{
  path: "manageScholarshipsAdmin",
  element: <AdminRoutes>
    <ManageScholarships></ManageScholarships>
  </AdminRoutes>,
},
{
  path: "adminProfile",
  element: <AdminRoutes>
    <AdminProfile></AdminProfile>
  </AdminRoutes>,
},
{
  path: "manageReview",
  element: <AdminRoutes>
    <ManageReview></ManageReview>
  </AdminRoutes>,
},
{
  path: "manageAppliedApplication",
  element: <AdminRoutes>
    <ManageAppliedApplication></ManageAppliedApplication>
  </AdminRoutes>,
},


// Moderator 
{
  path: "manageScholarshipsModerator",
  element:<ModeratorRoutes>
     <ManageScholarships></ManageScholarships>
  </ModeratorRoutes>,
},
{
  path: "addScholarship",
  element: 
    <ModeratorRoutes>
      <ScholarshipAdd></ScholarshipAdd>
    </ModeratorRoutes>,

},
{
  path: "myProfileModerator",
  element: <ModeratorRoutes>
    <MyProfileModerator></MyProfileModerator>
  </ModeratorRoutes>,
    

},
{
  path: "allReviewsModerator",
  element: <ModeratorRoutes>
    <AllReviewsModerator></AllReviewsModerator>
  </ModeratorRoutes>,
    

},
{
  path: "allAppliedScholarship",
  element: <ModeratorRoutes>
    <AllAppliedScholarship></AllAppliedScholarship>
  </ModeratorRoutes>,
    

},
{
  path: "addScholarshipModerator",
  element: <ModeratorRoutes>
    <AddScholarshipModerator></AddScholarshipModerator>
  </ModeratorRoutes>,
    
},


        ],
      },
    
    ]

    
   
  },

  

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  
  <QueryClientProvider client={queryClient}>
  <HelmetProvider> <div className='max-w-screen-xl mx-auto'>
   <RouterProvider router={router} />
   </div></HelmetProvider>
    </QueryClientProvider>
   
  </AuthProvider>
  </StrictMode>,
)
