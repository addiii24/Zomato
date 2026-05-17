import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const UserRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="role-badge">User</span>
          <h1>Create an account</h1>
          <p>Sign up to get started.</p>
        </div>
        
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="name@example.com" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="auth-btn">Sign up</button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>

        <div className="auth-alt">
          <Link to="/foodpartner/register" className="auth-alt-btn">Register as Food Partner</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
