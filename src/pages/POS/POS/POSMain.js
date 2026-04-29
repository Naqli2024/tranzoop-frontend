import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiSettings3Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { posTyresItems } from "../../../helpers/POSSidebarData";
import SignOutModal from "../Auth/SignOutModal";

const POSMain = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const storedTheme = Cookies.get("themeMode") || "dark";
  const [theme, setTheme] = useState("dark");
  const [openSignOutModal, setOpenSignOutModal] = useState(false);

  useEffect(() => {
    setTheme(storedTheme);
  }, [storedTheme]);

  const isDark = theme === "dark";
  const basePath = "/pos";

  const isSettingsActive = location.pathname === `${basePath}/settings` || location.pathname.startsWith(`${basePath}/settings`)

  return (
    <div className="pos-sidebar-layout">
      <aside className="pos-sidebar">
        <div className="pos-sidebar-nav">
          {posTyresItems?.map((item) => {
            const isActive =
              location.pathname === `${basePath}/${item.path}` ||
              location.pathname.startsWith(`${basePath}/${item.path}/`);
            return (
              <div className="pos-sidebar-section">
                <ul className="pos-sidebar-list">
                  <li key={item.path}>
                    <button
                      className={`pos-sidebar-item ${isActive ? "active" : ""}`}
                      onClick={() => navigateTo(`${basePath}/${item.path}`)}
                    >
                      <span className="pos-sidebar-icon">{item.icon}</span>
                      <span className="pos-sidebar-label">{item.label}</span>

                      {isActive && <span className="pos-active-dot" />}
                    </button>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
        <div className="pos-sidebar-footer">
          <button className={`pos-sidebar-link ${isSettingsActive ? "active" : ""}`} 
          onClick={()=> {
            navigateTo('/pos/settings')
          }}>
             <span className="pos-sidebar-link-icon"><RiSettings3Line size={18} /></span>
             <span className="pos-sidebar-link-label">Settings</span>
          </button>
          <div className="pos-sidebar-link danger" onClick={()=>setOpenSignOutModal(true)}>
            <RiLogoutBoxRLine size={18} />
            Sign Out
          </div>
        </div>
      </aside>
      <main className="pos-main-bar">
        <Outlet />
        <div className="powered">Powered by TRANZOOP</div>
      </main>
      {openSignOutModal && 
      <SignOutModal open ={()=>setOpenSignOutModal(true)} onClose={()=>setOpenSignOutModal(false)} />}
    </div>
  );
};

export default POSMain;
