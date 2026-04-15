import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiSettings3Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { posTyresItems } from "../../../helpers/POSSidebarData";

const POSMain = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const storedTheme = Cookies.get("themeMode") || "dark";
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(storedTheme);
  }, [storedTheme]);

  const isDark = theme === "dark";
  const basePath = "/pos";

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
          <div className="pos-sidebar-link">
            <RiSettings3Line size={18} />
            Settings
          </div>
          <div className="pos-sidebar-link danger">
            <RiLogoutBoxRLine size={18} />
            Sign Out
          </div>
        </div>
      </aside>
      <main className="pos-main-bar">
        <Outlet />
      </main>
    </div>
  );
};

export default POSMain;
