import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';


const FoodPartnerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
      e.preventDefault();
  
      const buissnessname = e.target.fullname.value;
      const ownername = e.target.ownerName.value;
      const contactnumber = e.target.contact.value;
      const address = e.target.address.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      
      try {
        const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register", {
          buissnessname,
          ownername,
          contactnumber,
          address,
          email,
          password
        },
        { withCredentials: true }); 
        navigate('/create-food');
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred during registration");
        }
      }
    }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">Partner</span>
          <h1>Join as a Partner</h1>
          <p>Register your restaurant with us.</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullname">Business Name</label>
            <input type="text" id="fullname" placeholder="Restaurant Name" />
          </div>

          <div className="form-group">
            <label htmlFor="ownerName">Owner Name</label>
            <input type="text" id="ownerName" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input type="tel" id="contact" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="123 Main St, City" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Business Email</label>
            <input type="email" id="email" placeholder="partner@example.com" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <button type="submit" className="auth-btn">Register Business</button>
        </form>
        
        <div className="auth-footer">
          Already a partner? <Link to="/foodpartner/login">Sign in</Link>
        </div>

        <div className="auth-alt">
          <Link to="/user/register" className="auth-alt-btn">Register as Regular User</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
