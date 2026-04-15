import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    icon: "🛞",
    title: "Tyre Shop",
    desc: "Work orders, wheel alignment, balancing, service tracking",
    tags: ["Work Orders", "Alignment", "Bay Tracking"],
    color: "#FF6B35",
    bg: "rgba(255,107,53,0.15)",
  },
  {
    icon: "🦐",
    title: "Seafood / Export",
    desc: "Batch processing, yield tracking, cold chain, export docs",
    tags: ["Batch Orders", "Yield Track", "Export"],
    color: "#00C4FF",
    bg: "rgba(0,196,255,0.15)",
  },
  {
    icon: "🛒",
    title: "Supermarket",
    desc: "Fast checkout, barcode scan, multi-category, loyalty points",
    tags: ["Fast Billing", "Barcode", "Loyalty"],
    color: "#22C55E",
    bg: "rgba(34,197,94,0.15)",
  },
  {
    icon: "🍽",
    title: "Restaurant",
    desc: "Table management, KOT, kitchen orders, combos",
    tags: ["Table Mgmt", "KOT", "Kitchen"],
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.15)",
  },
];

const HomePage = () => {
  const [selected, setSelected] = useState();
  const navigateTo = useNavigate();

  return (
    <div className="home-container">
      <div className="home-center">
        <h1 className="home-logo">TRANZOOP</h1>
        <p className="home-version">SMART BUSINESS OS · V1.0</p>

        <h2 className="home-title">Choose Your Business Type</h2>
        <p className="home-subtitle">
          Your POS will adapt its full interface for your industry
        </p>

        <div className="home-cards">
          {data.map((item, i) => (
            <div
              key={i}
              className={`home-card ${selected === i ? "active" : ""}`}
              onClick={() => {
                if (item.title === "Tyre Shop") {
                  navigateTo("/sign-in");
                } else {
                  navigateTo("/");
                }
                setSelected(i);
              }}
              style={{
                "--accent": item.color,
                "--accent-bg": item.bg,
              }}
            >
              <div className="home-icon">{item.icon}</div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <div className="home-tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>
              {item.title != "Tyre Shop" && (
                <div className="text-white pt-4">Coming Soon...</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
