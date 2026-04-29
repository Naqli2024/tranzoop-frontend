import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllERP } from "../../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

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

const COLORS = ["#FF6B35", "#00C4FF", "#22C55E", "#F59E0B"];

const BG_COLORS = [
  "rgba(255,107,53,0.15)",
  "rgba(0,196,255,0.15)",
  "rgba(34,197,94,0.15)",
  "rgba(245,158,11,0.15)",
];

const HomePage = () => {
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [erpData, setErpData] = useState([]);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getAllERP())
      .unwrap()
      .then((response) => {
        setErpData(response || []);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="home-container">
        <div className="home-center">
          <h1 className="home-logo">TRANZOOP</h1>
          <p className="home-version">SMART BUSINESS OS · V1.0</p>

          <h2 className="home-title">Choose Your Business Type</h2>
          <p className="home-subtitle">
            Your POS will adapt its full interface for your industry
          </p>

          <div className="home-cards">
            {erpData.length > 0 ? (
              erpData.map((item, i) => {
                const color = COLORS[i % COLORS.length];
                const bg = BG_COLORS[i % BG_COLORS.length];
                return (
                  <div
                    key={i}
                    className={`home-card ${selected === i ? "active" : ""}`}
                    onClick={() => {
                      if (item.name === "Tyre Shop") {
                         navigateTo(`/sign-in/${item.key}`);
                      } else {
                        navigateTo("/");
                      }
                      setSelected(i);
                    }}
                    style={{
                      "--accent": color,
                      "--accent-bg": bg,
                    }}
                  >
                    <div className="home-icon">{item.logo}</div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="home-tags">
                      {(item.modules || []).map((tag, idx) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </div>
                    {item.name != "Tyre Shop" && (
                      <div className="text-white pt-4">Coming Soon...</div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center">No ERP modules...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
