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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path:"/",
        element: <div>Hello</div>
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
            element:<AddMarathon></AddMarathon>
          },
          {
            path:"my-marathon-list",
            element:<MyMarathonList></MyMarathonList>
          },
          {
            path:"my-apply-list",
            element:<MyApplyList></MyApplyList>
          }
        ]
      },
      {
        path:"/marathons",
        element:<MarathonsGrid></MarathonsGrid>
      },
      {
        path:"/details/:id",
        element:<MarathonDetails></MarathonDetails>
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
