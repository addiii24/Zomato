import React from 'react'
import {BrowserRouter as Router ,Routes,Route, Navigate} from "react-router-dom";
import Home from '../general/Home';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import Createfood from '../general/Createfood';

function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={<Navigate to="/user/login" replace />} />
            <Route path='/user/login' element={<UserLogin />}/>
            <Route path='/user/register' element={<UserRegister />}/>
            <Route path='/foodpartner/login' element={<FoodPartnerLogin />}/>
            <Route path='/foodpartner/register' element={<FoodPartnerRegister />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/create-food' element={<Createfood />} />
        </Routes>
    </Router>
    </>
    
  )
}

export default App
