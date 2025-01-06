import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {


  return (
   <div>
    <NavBar>
    </NavBar>

    <div className='max-w-[1380px] mx-auto mt-8 mb-8'>
    <Outlet></Outlet>
    </div>

    <Footer></Footer>

   </div>
  )
}

export default App
