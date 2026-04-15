import React, { useState } from "react";

const tabs = [
  { key: "cust", label: "👤 Customer" },
  { key: "veh", label: "🚗 Vehicle" },
  { key: "svc", label: "🔧 Services" },
  { key: "tyres", label: "🛞 Tyres" },
  { key: "insp", label: "🔍 Inspection" },
  { key: "billing", label: "💰 Billing" },
  { key: "other", label: "📸 Extras" },
];

const AddWorkOrderModal = ({ closeModal }) => {
  const [activeTab, setActiveTab] = useState("cust");

  const now = new Date();
  const woNo = "TYR-" + String(Date.now()).slice(-6);

  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="wo-m-modal-overlay">
      <div className="wo-m-modal-box wo-m-modal-lg">
        
        {/* HEADER */}
        <div className="wo-m-modal-header">
          <span>🔧 New Tyre Work Order — Job Sheet</span>
          <button className="wo-m-modal-close" onClick={closeModal}>
            ✕
          </button>
        </div>

        {/* TOP INFO */}
        <div className="wo-m-modal-topbar">
          <span>📋 WO No: <b>{woNo}</b></span>
          <span>🏪 Branch: <b>Sri Murugan Tyres</b></span>
          <span>👤 Advisor: <b>Priya</b></span>
          <span>📅 <b>{date} {time}</b></span>
        </div>

        {/* TABS */}
        <div className="wo-m-modal-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`wo-m-modal-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="wo-m-modal-body">

          {activeTab === "cust" && (
            <div className="wo-m-grid wo-m-grid-2">
              <div className="wo-m-field">
                <label>Customer Name *</label>
                <input placeholder="Full name" />
              </div>
              <div className="wo-m-field">
                <label>Mobile *</label>
                <input placeholder="10-digit mobile" />
              </div>
              <div className="wo-m-field full">
                <label>Address</label>
                <textarea rows="2" placeholder="Address" />
              </div>
            </div>
          )}

          {activeTab === "veh" && (
            <div className="wo-m-grid wo-m-grid-3">
              <div className="wo-m-field">
                <label>Vehicle No</label>
                <input placeholder="TN38 AB 1234" />
              </div>
              <div className="wo-m-field">
                <label>Model</label>
                <input placeholder="Activa 6G" />
              </div>
              <div className="wo-m-field">
                <label>Type</label>
                <select>
                  <option>2-Wheeler</option>
                  <option>Car</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "svc" && (
            <div className="wo-m-chip-grid">
              {["Tyre Replacement", "Alignment", "Balancing", "Puncture"].map(
                (s) => (
                  <div className="wo-m-chip" key={s}>{s}</div>
                )
              )}
            </div>
          )}

          {activeTab === "tyres" && (
            <div className="wo-m-grid wo-m-grid-4">
              <div className="wo-m-field">
                <label>Brand</label>
                <input />
              </div>
              <div className="wo-m-field">
                <label>Size</label>
                <input />
              </div>
              <div className="wo-m-field">
                <label>Qty</label>
                <input type="number" />
              </div>
              <div className="wo-m-field">
                <label>MRP</label>
                <input type="number" />
              </div>
            </div>
          )}

          {activeTab === "insp" && (
            <div className="wo-m-grid wo-m-grid-2">
              <div className="wo-m-field">
                <label>Tyre Condition</label>
                <select>
                  <option>Good</option>
                  <option>Replace</option>
                </select>
              </div>
              <div className="wo-m-field">
                <label>Brake</label>
                <select>
                  <option>Good</option>
                  <option>Replace</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="wo-m-summary">
              <div className="wo-m-row">
                <span>Subtotal</span>
                <span>₹0</span>
              </div>
              <div className="wo-m-row total">
                <span>Total</span>
                <span>₹0</span>
              </div>
            </div>
          )}

          {activeTab === "other" && (
            <div className="wo-m-field">
              <label>Notes</label>
              <textarea rows="3" />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="wo-m-modal-footer">
          <button className="wo-m-btn">Cancel</button>
          <button className="wo-m-btn wo-m-btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkOrderModal;