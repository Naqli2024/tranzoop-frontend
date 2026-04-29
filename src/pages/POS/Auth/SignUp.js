import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { createBusiness } from "../../../redux/Auth/AuthSlice";
import OTPModal from "./OTPModal";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const { key } = useParams();
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    mobile: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      const response = await dispatch(createBusiness({key,formData})).unwrap();
      toast.success(response.message);
      setLoading(false);
      setOpenOTPModal(true);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
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
            <input className="sign-in-input" 
            placeholder="Your shop name" 
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            />
          </div>
          <div className="sign-in-field">
            <div className="sign-in-label">City / Location</div>
            <input className="sign-in-input" 
            placeholder="Location" 
            name="address"
            value={formData.address}
            onChange={handleChange}
            />
          </div>
        </div>
        <div className="sign-in-field">
          <div className="sign-in-label">Username</div>
          <input className="sign-in-input" 
          placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange} 
          />
        </div>
        <div className="sign-in-field">
          <div className="sign-in-label">Password</div>
          <div className="sign-in-password-wrapper">
            <input
              className="sign-in-input"
              placeholder="Password"
              type={show ? "text" : "password"}
              name="password"
            value={formData.password}
            onChange={handleChange}
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
          <input className="sign-in-input" 
          placeholder="Mobile Number"
          type="number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange} 
          />
        </div>
        <button className="sign-in-btn" onClick={handleSubmit}>Create Account →</button>
        <div className="sign-in-new-account">
          Already have an account? <span onClick={() => navigateTo(`/sign-in/${key}`)}>Sign in</span>
        </div>
      </div>
    </div>
    {openOTPModal && <OTPModal open ={()=>setOpenOTPModal(true)} onClose={()=>setOpenOTPModal(false)} mobileNo={formData.mobile} key={key} />}
    </div>
  );
};

export default SignUp;
