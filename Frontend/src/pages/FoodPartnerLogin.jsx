import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const FoodPartnerLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">Partner</span>
          <h1>Partner Portal</h1>
          <p>Sign in to manage your restaurant.</p>
        </div>
        
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Business Email</label>
            <input type="email" id="email" placeholder="partner@example.com" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="auth-btn">Sign in</button>
        </form>
        
        <div className="auth-footer">
          Want to partner with us? <Link to="/foodpartner/register">Apply here</Link>
        </div>

        <div className="auth-alt">
          <Link to="/user/login" className="auth-alt-btn">Sign in as Regular User</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
