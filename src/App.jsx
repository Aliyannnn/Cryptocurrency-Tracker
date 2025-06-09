import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './Components/Header'
import Home from './Pages/Home'
import Coin from './Pages/Coin'
import Banner from './Components/Banner/Banner'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

         <Header />
         <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/coins/:id' element={<Coin />} />
         </Routes>
    </div>

  )
}

export default App
