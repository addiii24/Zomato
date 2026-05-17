import React from 'react'
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';

function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/'/>
            <Route path='/user/login' element={<UserLogin />}/>
            <Route path='/user/register' element={<UserRegister />}/>
            <Route path='/foodpartner/login' element={<FoodPartnerLogin />}/>
            <Route path='/foodpartner/register' element={<FoodPartnerRegister />}/>
        </Routes>
    </Router>
    </>
    
  )
}

export default App
