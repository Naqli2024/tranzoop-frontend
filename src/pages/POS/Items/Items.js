import React, { useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";
import AddItemsModal from "./AddItemsModal";

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

const Items = () => {
  const [search, setSearch] = useState("");
  const [openAddItemModal, setOpenAddItemModal] = useState(false);

  const stockVal = SAMPLE_ITEMS.reduce((s, i) => s + i.cost * i.stock, 0);
  const lowStock = SAMPLE_ITEMS.filter(
    (i) => i.stock > 0 && i.stock < 6,
  ).length;
  const outOfStock = SAMPLE_ITEMS.filter((i) => i.stock === 0).length;

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

  const getStockTag = (i) => {
    if (i.stock === 999)
      return <span className="items-tag items-grey">Service</span>;
    if (i.stock === 0) return <span className="items-tag items-err">Out</span>;
    if (i.stock <= i.min)
      return <span className="items-tag items-pend">Low</span>;
    return <span className="items-tag items-ok">OK</span>;
  };

  return (
    <div className="items-wrap">
      <div className="wo-ph">
        <span className="wo-ph-title">📦 Item Master</span>
        <div className="wo-ph-actions">
          <button
            class="btn btn-p btn-sm"
            onClick={() => setOpenAddItemModal(true)}
          >
            <IoAdd size={15} /> Add Item
          </button>
        </div>
      </div>
      <div className="items-mg items-mg-4" style={{ flexShrink: 0 }}>
        <div className="items-mc">
          <div className="items-mc-l">Total SKUs</div>
          <div className="items-mc-v">{SAMPLE_ITEMS.length}</div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--a2)" }}>
          <div className="items-mc-l">Low Stock</div>
          <div className="items-mc-v" style={{ color: "var(--a2)" }}>
            {lowStock}
          </div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--red)" }}>
          <div className="items-mc-l">Out of Stock</div>
          <div className="items-mc-v" style={{ color: "var(--red)" }}>
            {outOfStock}
          </div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--green)" }}>
          <div className="items-mc-l">Stock Value</div>
          <div className="items-mc-v">₹{(stockVal / 1000).toFixed(1)}K</div>
        </div>
      </div>

      <div class="items-filter-bar">
        <input
          class="items-inp"
          style={{ flex: "1", maxWidth: "300px" }}
          placeholder="Search name, SKU, HSN…"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>
      <div class="items-table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>HSN</th>
              <th>GST%</th>
              <th>MRP</th>
              <th>Cost</th>
              <th>Margin%</th>
              <th>Stock</th>
              <th>Status</th>
              <th>★</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id}>
                <td className="items-name">{i.name}</td>
                <td className="items-code">{i.sku}</td>
                <td>{i.cat}</td>
                <td className="items-code">{i.hsn}</td>
                <td>{i.gst}%</td>

                <td className="items-num items-bold">
                  ₹{i.mrp.toLocaleString("en-IN")}
                </td>

                <td className="items-num items-muted">
                  ₹{i.cost.toLocaleString("en-IN")}
                </td>

                <td className="items-num items-green items-bold">
                  {(((i.mrp - i.cost) / i.mrp) * 100).toFixed(1)}%
                </td>

                <td className="items-num">{i.stock === 999 ? "∞" : i.stock}</td>

                <td>{getStockTag(i)}</td>

                <td className="items-fav">{i.fav ? "⭐" : "☆"}</td>

                <td>
                  <button className="btn btn-sm items-btn">Edit</button>
                </td>
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
      {openAddItemModal && <AddItemsModal closeModal={setOpenAddItemModal} />}
    </div>
  );
};

export default Items;
