import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <NavBar>
    </NavBar>

    <Footer></Footer>

   </div>
  )
}

export default App
