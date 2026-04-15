import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import CarTyre from "../../../assets/images/car-tyre.png";
import { MdOutlineCancel } from "react-icons/md";
import AddItemsModal from "../Items/AddItemsModal";
import AddCustomerModal from "../Customer/AddCustomerModal";
import SelectCustomerModal from "../Customer/SelectCustomerModal";
import AddWorkOrderModal from "../WorkOrder/AddWorkOrderModal";

const payModes = [
  { l: "Cash", i: "💵" },
  { l: "UPI", i: "📱" },
  { l: "Card", i: "💳" },
  { l: "Wallet", i: "👜" },
  { l: "Points", i: "⭐" },
  { l: "Mixed", i: "⚡" },
];

const POS = () => {
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [openSelectCustomerModal, setOpenSelectCustomerModal] = useState(false);
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
  const [openAddWorkerOrderModal, setOpenAddWorkerOrderModal] = useState(false);
  return (
    <div class="pos-m-container">
      <div class="pos-m-left">
        <div class="pos-m-scan-bar">
          <div className="pos-m-scan-input-wrap">
            <IoSearchOutline className="pos-m-search-icon" />
            <input
              className="pos-m-scan-inp"
              placeholder="Scan barcode / type item name…"
            />
            <MdOutlineKeyboardVoice className="pos-m-voice-icon" size={20} />
          </div>
          <button
            class="pos-m-btn-sm btn-p"
            onClick={() => setOpenAddItemModal(true)}
          >
            <IoAdd size={15} /> Add Item
          </button>
          <button class="pos-m-btn-sm btn-b" onClick={() => setOpenAddWorkerOrderModal(true)}>
            <IoAdd size={15} /> Work Order
          </button>
        </div>
        <div class="pos-m-cat-row">
          <div className="pos-m-cat-filter active">All</div>
        </div>
        <div class="pos-m-prod-grid">
          <div className="pos-m-prod-card">
            <div className="pos-m-prod-card-image">
              <img src={CarTyre} />
            </div>
            <div className="pos-m-prod-card-name">Tyre</div>
            <div className="pos-m-prod-card-code">MRF-ZAP_9010</div>
            <div className="pos-m-prod-card-price">₹2000</div>
            <div className="pos-m-prod-card-stock">24 NOs</div>
          </div>
        </div>
      </div>
      <div class="pos-m-right">
        <div class="pos-m-cart-top">
          <div class="pos-m-cart-av">W</div>
          <div style={{ flex: "1" }}>
            <div class="pos-m-cart-cname">Walk-in Customer</div>
            <div class="pos-m-cart-inv-no">INV-26-00001</div>
          </div>
          <div
            className="pos-m-change-text"
            onClick={() => setOpenSelectCustomerModal(true)}
          >
            Change ›
          </div>
        </div>
        <div class="pos-m-cart-body">
          <div class="pos-m-ci">
            <div class="pos-m-ci-info">
              <div class="pos-m-ci-name">Tyre</div>
              <div class="pos-m-ci-meta">₹400 · NOS · 18% GST</div>
            </div>
            <div class="pos-m-ci-right">
              <div class="pos-m-qty-ctrl">
                <button class="pos-m-qb">−</button>
                <span class="pos-m-qn">5</span>
                <button class="pos-m-qb">+</button>
              </div>
              <div class="pos-m-ci-total">₹2000</div>
            </div>
            <button class="pos-m-del-btn">
              <MdOutlineCancel />
            </button>
          </div>
          <div class="pos-m-cart-empty">
            <div style={{ fontSize: "36px" }}>🛒</div>
            <div>Cart is empty</div>
            <div style={{ fontSize: "10px", textAlign: "center" }}>
              Scan or tap a product to add
            </div>
          </div>
        </div>
        <div class="pos-m-bill-sum">
          <div class="pos-m-disc-box">
            <div class="pos-m-disc-row">
              <span className="pos-m-discount-text">Discount</span>
              <div class="pos-m-disc-toggle">
                <button class="pos-m-dt-btn act">%</button>
                <button class="pos-m-dt-btn">₹</button>
              </div>
              <input type="number" class="pos-m-discount-inp" min="0" />
            </div>
          </div>
          <div class="pos-m-sr">
            <span>Subtotal</span>
            <span>₹0</span>
          </div>
          <div class="pos-m-sr pos-m-disc-r" style={{ display: "none" }}>
            <span>Discount</span>
            <span>−₹0</span>
          </div>
          <div class="pos-m-sr">
            <span>CGST + SGST</span>
            <span>₹0</span>
          </div>
          <div class="pos-m-sr pos-m-grand">
            <span>TOTAL</span>
            <span>₹0</span>
          </div>
          <div class="pos-m-pay-grid">
            {payModes.map((payment) => (
              <div class="pos-m-pb2">
                <span class="pos-m-pb2-i">{payment.i}</span>
                {payment.l}
              </div>
            ))}
          </div>
          <button class="pos-m-charge-btn" disabled>
            Charge ₹0
          </button>
          <div class="pos-m-cart-qa mt-2">
            <button class="pos-m-cqa">⏸ Hold</button>
            <button class="pos-m-cqa">📋 Held</button>
            <button class="pos-m-cqa" style={{ display: "none" }}>
              🔧 WO
            </button>
            <button class="pos-m-cqa">🗑 Clear</button>
          </div>
        </div>
      </div>

      {openAddItemModal && <AddItemsModal closeModal={setOpenAddItemModal} />}
      {openSelectCustomerModal && (
        <SelectCustomerModal
          closeModal={setOpenSelectCustomerModal}
          openAddModal={setOpenAddCustomerModal}
        />
      )}
      {openAddCustomerModal && (
        <AddCustomerModal closeModal={setOpenAddCustomerModal} />
      )}
      {openAddWorkerOrderModal && (
        <AddWorkOrderModal closeModal={setOpenAddWorkerOrderModal} />
      )}
    </div>
  );
};

export default POS;
