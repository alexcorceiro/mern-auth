import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import axios from "axios"
import { ToastContainer } from 'react-toastify';

axios.defaults.withCredentials = true

function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/> 
          <Route path='/updateProfile/:id' element={<UpdateProfile/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App