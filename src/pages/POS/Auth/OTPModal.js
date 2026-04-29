import React, { useRef, useState } from "react";
import { FiShield } from "react-icons/fi";
import Loader from "../../../components/Loader";
import { verifyMobileNumber } from "../../../redux/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTPModal = ({ open, onClose, mobileNo, key }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((val, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = val;
      }
    });
  };

  const handleSubmit = async (e) => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return;
    try {
      setLoading(true);
      const payload = {
        mobile: mobileNo,
        otp: finalOtp,
      };
      const response = await dispatch(verifyMobileNumber(payload)).unwrap();
      toast.success(response.message);
      setLoading(false);
      onClose();
      navigateTo(`/sign-in/${key}`);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="otp-overlay">
        <div className="otp-modal">
          <div className="otp-header">
            <FiShield className="otp-icon" />
            <h3>Verify OTP</h3>
            <p>Enter the 6-digit code sent to your mobile</p>
          </div>

          <div className="otp-inputs" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                className="otp-input"
                value={digit}
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>

          <button className="otp-btn" onClick={handleSubmit}>
            Verify OTP
          </button>
          <span className="otp-close" onClick={onClose}>
            ✕
          </span>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
