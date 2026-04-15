import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import AddCustomerModal from "./AddCustomerModal";

const customers = [
  {
    initials: "WK",
    name: "Walk-in Customer",
    phone: "—",
    type: "B2C",
    color: "#5E7099",
    pts: 0,
  },
  {
    initials: "SR",
    name: "Suresh Rajan",
    phone: "98421 XXXXX",
    type: "B2C",
    color: "#00E5B4",
    pts: 1240,
  },
  {
    initials: "RM",
    name: "Rajan Motors",
    phone: "94451 XXXXX",
    type: "B2B",
    color: "#3B82F6",
    pts: 0,
  },
  {
    initials: "MG",
    name: "Murugan Garage",
    phone: "97891 XXXXX",
    type: "B2B",
    color: "#8B5CF6",
    pts: 860,
  },
  {
    initials: "KR",
    name: "Kumar",
    phone: "94210 XXXXX",
    type: "B2C",
    color: "#F59E0B",
    pts: 320,
  },
];

const Customer = () => {
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);

  return (
    <div className="customer-container">
      <div className="wo-ph">
        <span className="wo-ph-title">👥 Party Master</span>
        <div className="wo-ph-actions">
          <input
            class="items-inp"
            style={{ width: "220px" }}
            placeholder="Search…"
            oninput="buildCustList()"
          />
          <button
            class="btn btn-p btn-sm"
            onClick={() => setOpenAddCustomerModal(true)}
          >
            <IoAdd size={15} /> Add Party
          </button>
        </div>
      </div>
      <div className="customer-card-grid">
        {customers.map((c, i) => (
          <div className="customer-card">
            <div
              className="po-m-modal-avatar"
              style={{ "--avatar-color": c.color }}
            >
              {c.initials}
            </div>

            <div className="customer-info">
              <div className="customer-name">{c.name}</div>

              <div className="customer-sub">{c.phone}</div>

              <div className="customer-tags">
                <span className="customer-tag me-2">{c.type}</span>
                <span className="customer-pts-tag">⭐ {c.pts} pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openAddCustomerModal && (
        <AddCustomerModal closeModal={setOpenAddCustomerModal} />
      )}
    </div>
  );
};

export default Customer;
