import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {


  return (
   <div>
    <NavBar>
    </NavBar>

    <Outlet></Outlet>

    <Footer></Footer>

   </div>
  )
}

export default App
