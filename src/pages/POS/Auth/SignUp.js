import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <div className="sign-in-header">
          <div className="sign-in-badge">🛞 Tyre Shop</div>
          <div className="sign-in-title">Sign Up</div>
          <div className="sign-in-sub">Sign up to your Tranzoop account</div>
        </div>
        <div className="sign-up-row sign-up-row2">
          <div className="sign-in-field">
            <div className="sign-in-label">Business Name</div>
            <input className="sign-in-input" placeholder="Your shop name" />
          </div>
          <div className="sign-in-field">
            <div className="sign-in-label">City / Location</div>
            <input className="sign-in-input" placeholder="Location" />
          </div>
        </div>
        <div className="sign-in-field">
          <div className="sign-in-label">Username</div>
          <input className="sign-in-input" placeholder="Username" />
        </div>
        <div className="sign-in-field">
          <div className="sign-in-label">Password</div>
          <div className="sign-in-password-wrapper">
            <input
              className="sign-in-input"
              placeholder="Password"
              type={show ? "text" : "password"}
            />
            <span className="sign-in-eye-icon" onClick={() => setShow(!show)}>
              {show ? (
                <IoEyeOffOutline size={18} />
              ) : (
                <IoEyeOutline size={18} />
              )}
            </span>
          </div>
        </div>
        <div className="sign-in-field">
          <div className="sign-in-label">Mobile Number</div>
          <input className="sign-in-input" placeholder="Mobile Number" />
        </div>
        <button className="sign-in-btn">Create Account →</button>
        <div
          className="sign-in-new-account"
          onClick={() => navigateTo("/sign-in")}
        >
          Already have an account? <span>Sign in</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
