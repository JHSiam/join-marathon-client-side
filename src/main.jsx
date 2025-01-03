import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage.jsx';
import AuthProvider from './authentication/AuthProvider.jsx';
import Login from './authentication/Login.jsx';
import Register from './authentication/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddMarathon from './components/dashoboardPages/AddMarathon.jsx';
import MyMarathonList from './components/dashoboardPages/MyMarathonList.jsx';
import MyApplyList from './components/dashoboardPages/MyApplyList.jsx';
import MarathonsGrid from './components/dashoboardPages/MarathonsGrid.jsx';
import MarathonDetails from './components/dashoboardPages/MarathonDetails.jsx';
import MarathonRegistration from './components/MarathonRegistration.jsx';
import PrivatePage from './routes/PrivatePage.jsx';
import HomePage from './components/homepages/HomePage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path:"/",
        element: <HomePage></HomePage>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
          {
            path:"add-marathon",
            element:<PrivatePage><AddMarathon></AddMarathon></PrivatePage>
          },
          {
            path:"my-marathon-list",
            element:<PrivatePage><MyMarathonList></MyMarathonList></PrivatePage>
          },
          {
            path:"my-apply-list",
            element:<PrivatePage><MyApplyList></MyApplyList></PrivatePage>
          },
          {
            path:"",
            element:<PrivatePage><AddMarathon></AddMarathon></PrivatePage>
          }
        ]
      },
      {
        path:"/marathons",
        element:<PrivatePage><MarathonsGrid></MarathonsGrid></PrivatePage>
      },
      {
        path:"/details/:id",
        element:<PrivatePage><MarathonDetails></MarathonDetails></PrivatePage>
      },
      {
        path:"/marathon-registration/:id",
        element:<PrivatePage><MarathonRegistration></MarathonRegistration></PrivatePage>
      }
    ]
    
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    
  </StrictMode>,
)
