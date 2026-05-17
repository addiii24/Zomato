import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">User</span>
          <h1>Welcome back</h1>
          <p>Please enter your details to sign in.</p>
        </div>
        
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="name@example.com" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="auth-btn">Sign in</button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/user/register">Sign up</Link>
        </div>

        <div className="auth-alt">
          <Link to="/foodpartner/login" className="auth-alt-btn">Sign in as Food Partner</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
