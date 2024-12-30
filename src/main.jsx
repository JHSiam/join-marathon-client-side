import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<ErrorPage></ErrorPage>,
    
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AuthProvider> */}
      <RouterProvider router={router}></RouterProvider>
    {/* </AuthProvider> */}
    
  </StrictMode>,
)
