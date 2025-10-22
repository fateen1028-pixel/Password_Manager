// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Manager from './components/manager'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-[87vh]">
    <Manager></Manager>
    </div>
    <Footer></Footer>
    </>
  )
}

export default App
