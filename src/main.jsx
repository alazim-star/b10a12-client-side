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
import ScholarshipAdd from './Pages/DashBoard/ScholarshipAdd';
import AllScholarships from './ScholarShip/AllScholarships';
import ViewDetails from './Pages/ViewDetails';
import CheckOutFrom from './Payment/CheckOutFrom';
import MyApplication from './Pages/DashBoard/MyApplication';
import Dashboard from './Pages/DashBoard/Dashboard';
import AdminProfile from './Pages/DashBoard/AdminProfile';
import PrivateRoute from './PrivetRoute/PrivateRoute';

import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import UserProfile from './Pages/DashBoard/userProfile';




const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout>Hello world!</MainLayout>,
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
        path: "/dashboard",
        element: <PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute>,
        children:[
         
// user dashboard 

          {
            path: "myApplication",
            element: <MyApplication></MyApplication>,
          },
         
          {
            path: "myProfile",
            element: <UserProfile></UserProfile>,
          },

// admin dashboard
{
  path: "addScholarship",
  element: <ScholarshipAdd></ScholarshipAdd>,
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
