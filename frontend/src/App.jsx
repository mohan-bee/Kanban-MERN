import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={'/login'} element={<Login/>} />
      <Route path={'/register'} element={<Register/>} />
      <Route path={'/'} element={<Home />} /> 
    </Routes>
    </BrowserRouter>
    
  )
}

export default App