import React, { useContext } from 'react'
import { ThemeContext } from '../../helpers/ThemeContext';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { GoPerson } from "react-icons/go";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className='header-container'>
      <div className='header-left-content'>
        <div className='header-title'>
        TRANZOOP TYRES
      </div>
       <div class="sign-in-badge">🛞 Tyre Shop</div>
       <div className='sign-in-date'>{formattedDate}</div>
      </div>
      <div className='header-right-content'>
        <div className="dark-light-theme-toggle">
              <div
                className={`dark-light-theme-btn ${
                  theme === "dark" ? "active" : ""
                }`}
                onClick={toggleTheme}
              >
                <MdOutlineDarkMode />
              </div>
              <div
                className={`dark-light-theme-btn ${
                  theme === "light" ? "active" : ""
                }`}
                onClick={toggleTheme}
              >
                <MdOutlineLightMode />
              </div>
            </div>
                        <div className="header-profile-avatar-container">
              <div className="header-profile-avatar">
              <GoPerson size={18}/>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Header