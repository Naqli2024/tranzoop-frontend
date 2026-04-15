import React, { useState } from "react";
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

const SelectCustomerModal = ({ closeModal, openAddModal }) => {
  return (
    <div className="po-m-overlay">
      <div className="po-m-box po-m-sm">

        <div className="po-m-header">
          <span>Select Party</span>
          <button
            className="po-m-close"
            onClick={() => closeModal(false)}
          >
            ✕
          </button>
        </div>

        <input className="po-m-input po-m-search" placeholder="Search…" />

        <div className="po-m-list">
          {customers.map((c, i) => (
            <div
              key={i}
              className="po-m-modal-item"
            >
              <div
                className="po-m-modal-avatar"
                style={{ "--avatar-color": c.color }}
              >
                {c.initials}
              </div>

              <div className="po-m-modal-info">
                <div className="po-m-modal-name">{c.name}</div>
                <div className="po-m-modal-phone">{c.phone}</div>
              </div>

              <span className="po-m-modal-tag">{c.type}</span>
            </div>
          ))}
        </div>

        <div className="po-m-footer po-m-full">
          <button
            className="po-m-btn po-m-primary"
            onClick={() => {
              closeModal(false);  
              openAddModal(true);  
            }}
          >
            + Add New Party
          </button>
        </div>

      </div>
    </div>
  );
};

export default SelectCustomerModal;
