import React, { useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";

const SAMPLE_ITEMS = [
  {
    name: "MRF ZVTS 185/65R15",
    sku: "MRF-001",
    cat: "Tyres",
    hsn: "4011",
    gst: 28,
    mrp: 4200,
    cost: 2800,
    stock: 8,
    status: "active",
  },
  {
    name: "Apollo Amazer 175/70R13",
    sku: "APL-002",
    cat: "Tyres",
    hsn: "4011",
    gst: 28,
    mrp: 3100,
    cost: 2100,
    stock: 12,
    status: "active",
  },
  {
    name: "Amaron Pro 55B24L",
    sku: "AMR-003",
    cat: "Battery",
    hsn: "8507",
    gst: 18,
    mrp: 5800,
    cost: 4200,
    stock: 4,
    status: "low",
  },
  {
    name: "Castrol GTX 10W30 1L",
    sku: "CST-004",
    cat: "Oils",
    hsn: "2710",
    gst: 18,
    mrp: 480,
    cost: 340,
    stock: 24,
    status: "active",
  },
  {
    name: "Bridgestone B290 185/60R15",
    sku: "BRG-005",
    cat: "Tyres",
    hsn: "4011",
    gst: 28,
    mrp: 3900,
    cost: 2750,
    stock: 0,
    status: "out",
  },
  {
    name: "Wheel Alignment Service",
    sku: "SVC-001",
    cat: "Service",
    hsn: "9987",
    gst: 18,
    mrp: 600,
    cost: 0,
    stock: 99,
    status: "active",
  },
];

const Stock = () => {
  const [search, setSearch] = useState("");

  const prods = SAMPLE_ITEMS || [];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return prods.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q),
    );
  }, [search, prods]);

  return (
    <div className="stock-container">
      <div className="wo-ph">
        <span className="wo-ph-title">📋 Stock Ledger</span>
        <div className="wo-ph-actions">
          <button class="btn btn-b btn-sm">
            <IoAdd size={15} /> Purchase
          </button>
          <button class="btn btn-g btn-sm">
            <IoAdd size={15} /> Adjustment
          </button>
        </div>
      </div>
      <div className="items-mg items-mg-4" style={{ flexShrink: 0 }}>
        <div className="items-mc">
          <div className="items-mc-l">Opening</div>
          <div className="items-mc-v">1,842</div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--a2)" }}>
          <div className="items-mc-l">Purchases In</div>
          <div className="items-mc-v" style={{ color: "var(--a2)" }}>
            +342
          </div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--red)" }}>
          <div className="items-mc-l">Sales Out</div>
          <div className="items-mc-v" style={{ color: "var(--red)" }}>
            -287
          </div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--green)" }}>
          <div className="items-mc-l">Closing Stock</div>
          <div className="items-mc-v">1,823</div>
        </div>
      </div>
      <div class="items-filter-bar">
        <input
          class="items-inp"
          style={{ flex: "1", maxWidth: "300px" }}
          placeholder="Search name, SKU, HSN…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div class="items-table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Ref</th>
              <th>Type</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Value</th>
              <th>Party</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id}>
                <td className="items-code">14 Apr</td>
                <td className="items-code">STK-001</td>
                <td>
                  <span class="tag t-ok">IN</span>
                </td>
                <td className="items-code items-bold">{i.name}</td>
                <td>{i.stock === 999 ? "∞" : "+" + i.stock}</td>
                <td className="items-num items-bold">
                  ₹{i.cost.toLocaleString("en-IN")}
                </td>
                <td className="items-num items-muted">
                  ₹
                  {(i.cost * (i.stock === 999 ? 1 : i.stock)).toLocaleString(
                    "en-IN",
                  )}
                </td>
                <td className="items-code">Opening stock</td>
              </tr>
            ))}

            {!filtered.length && (
              <tr>
                <td colSpan="12" className="items-empty">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
