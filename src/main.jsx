import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './MainLayOut/Mainlayout';
import Home from './Pages/Home/Home';
import Login from './Pages/Login';




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

    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='max-w-screen-xl mx-auto'>
   <RouterProvider router={router} />
   </div>
  </StrictMode>,
)
