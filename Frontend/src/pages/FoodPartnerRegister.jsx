import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const FoodPartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">Partner</span>
          <h1>Join as a Partner</h1>
          <p>Register your restaurant with us.</p>
        </div>
        
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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
            <input type="password" id="password" placeholder="••••••••" />
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
