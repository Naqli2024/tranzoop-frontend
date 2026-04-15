import React, { useState } from "react";
import { toast } from "react-toastify";

const WO_STATUSES = ["pending", "inprog", "qc", "done", "delivered"];

const tyreWorkOrders = [
  {
    id: "TYR-2604-01",
    date: "10-Apr-26",
    time: "09:15",
    branch: "Sri Murugan Tyres — Coimbatore",
    advisor: "Priya R.",
    cust: "Suresh Kumar",
    phone: "94210XXXXX",
    email: "suresh@email.com",
    address: "12, Gandhi Nagar, CBE",
    vehicle: "TN 38 AX 9012",
    make: "Honda Activa",
    vehType: "2-Wheeler",
    km: 24500,
    fuel: "Petrol",
    services: ["tyre_replace", "balancing"],
    complaint: "Front tyre worn out, vehicle vibrating at high speed",
    tyreItems: [
      {
        brand: "MRF",
        size: "90/90-10",
        qty: 1,
        condition: "New",
        serial: "MRF2604001",
        position: "Front",
      },
    ],
    addons: [
      { name: "Tube TR87", qty: 1, price: 320 },
      { name: "Valve Rubber", qty: 1, price: 40 },
    ],
    inspection: {
      tyreWear: "Poor",
      brakes: "OK",
      alignment: "Minor Issue",
      suspension: "OK",
      airPressure: "Low",
    },
    tech: "Ramesh",
    startTime: "09:30",
    endTime: "10:15",
    workDone:
      "Replaced front tyre, fitted tube, balanced wheel, inflated to 32 PSI",
    prodItems: [
      { name: "MRF Zapper X 90/90-10", qty: 1, rate: 1800 },
      { name: "Tube 90/90-10", qty: 1, rate: 320 },
      { name: "Rubber Valve", qty: 1, rate: 40 },
    ],
    svcItems: [
      { name: "Tyre Fitting", qty: 1, rate: 250 },
      { name: "Wheel Balancing", qty: 1, rate: 400 },
    ],
    subtotal: 2810,
    discount: 0,
    gst: 505,
    total: 2810,
    payMode: "UPI",
    payStatus: "paid",
    custApproval: true,
    photos: ["before_tyre", "after_tyre"],
    staffNotes: "Customer happy, recommended rear tyre check in 2 months",
    nextService: "10-Jun-26",
    warrantyExpiry: "10-Apr-27",
    aiSuggestions: [
      "Rear tyre at 40% wear — suggest replacement in 60 days",
      "Brake pads showing normal wear",
    ],
    bay: 1,
    status: "done",
    eta: "Ready",
    totalEst: 2810,
    note: "",
  },
  {
    id: "TYR-2604-02",
    date: "10-Apr-26",
    time: "10:00",
    branch: "Sri Murugan Tyres — Coimbatore",
    advisor: "Selvan",
    cust: "Rani Transport",
    phone: "94450XXXXX",
    email: "",
    address: "Avinashi Road, CBE",
    vehicle: "TN 11 BK 4532",
    make: "Tata LPT 1616",
    vehType: "Truck",
    km: 87200,
    fuel: "Diesel",
    services: ["tyre_replace", "alignment"],
    complaint: "4 tyres completely worn, pulling to left on highway",
    tyreItems: [
      {
        brand: "MRF",
        size: "10.00-20",
        qty: 4,
        condition: "New",
        serial: "",
        position: "All 4",
      },
    ],
    addons: [
      { name: "Flap 10.00-20", qty: 4, price: 480 },
      { name: "Nitrogen Filling", qty: 4, price: 100 },
    ],
    inspection: {
      tyreWear: "Critical",
      brakes: "OK",
      alignment: "Bad",
      suspension: "Check Needed",
      airPressure: "Very Low",
    },
    tech: "Murugan",
    startTime: "10:30",
    endTime: "",
    workDone: "",
    prodItems: [
      { name: "MRF STEEL MUSCLE 10.00-20", qty: 4, rate: 18500 },
      { name: "Flap 10.00-20", qty: 4, rate: 480 },
    ],
    svcItems: [
      { name: "Tyre Fitting", qty: 4, rate: 250 },
      { name: "Wheel Alignment", qty: 1, rate: 600 },
      { name: "Nitrogen Filling", qty: 4, rate: 100 },
    ],
    subtotal: 79600,
    discount: 2000,
    gst: 14040,
    total: 77600,
    payMode: "BNPL",
    payStatus: "pending",
    custApproval: true,
    photos: [],
    staffNotes: "Check rear axle also — customer requested",
    nextService: "10-Oct-26",
    warrantyExpiry: "10-Apr-27",
    aiSuggestions: [
      "Rear axle suspension shows stress — recommend inspection",
      "Schedule next alignment in 10,000 km",
    ],
    bay: 2,
    status: "pending",
    eta: "2 hrs",
    totalEst: 75600,
    note: "Check rear axle also",
  },
  {
    id: "TYR-2604-03",
    date: "10-Apr-26",
    time: "11:30",
    branch: "Sri Murugan Tyres — Coimbatore",
    advisor: "Priya R.",
    cust: "Prakash",
    phone: "87540XXXXX",
    email: "",
    address: "RS Puram, CBE",
    vehicle: "TN 59 CD 3421",
    make: "Royal Enfield Classic 350",
    vehType: "2-Wheeler",
    km: 23000,
    fuel: "Petrol",
    services: ["tyre_replace", "puncture"],
    complaint: "Rear tyre cracked, front tyre puncture",
    tyreItems: [
      {
        brand: "Bridgestone",
        size: "120/80-17",
        qty: 1,
        condition: "New",
        serial: "BRG2604001",
        position: "Rear",
      },
    ],
    addons: [{ name: "Puncture Repair Kit", qty: 1, price: 150 }],
    inspection: {
      tyreWear: "Rear-Critical",
      brakes: "Good",
      alignment: "OK",
      suspension: "OK",
      airPressure: "Normal",
    },
    tech: "Selvan",
    startTime: "11:45",
    endTime: "12:15",
    workDone:
      "Replaced rear tyre, repaired front puncture, pressure check all wheels",
    prodItems: [{ name: "Bridgestone Battlax 120/80-17", qty: 1, rate: 4200 }],
    svcItems: [
      { name: "Tyre Fitting", qty: 1, rate: 250 },
      { name: "Puncture Repair", qty: 1, rate: 150 },
    ],
    subtotal: 4600,
    discount: 0,
    gst: 828,
    total: 4600,
    payMode: "Cash",
    payStatus: "paid",
    custApproval: true,
    photos: ["before_rear"],
    staffNotes: "",
    nextService: "10-Oct-26",
    warrantyExpiry: "10-Apr-27",
    aiSuggestions: ["Front tyre at 55% wear — watch for next 5,000 km"],
    bay: 3,
    status: "qc",
    eta: "10 mins",
    totalEst: 4550,
    note: "",
  },
  {
    id: "TYR-2604-04",
    date: "10-Apr-26",
    time: "08:00",
    branch: "Sri Murugan Tyres — Coimbatore",
    advisor: "Selvan",
    cust: "ABC Cabs",
    phone: "98430XXXXX",
    email: "abccabs@gmail.com",
    address: "Race Course, CBE",
    vehicle: "TN 07 AP 8821",
    make: "Toyota Innova Crysta",
    vehType: "Car/SUV",
    km: 56000,
    fuel: "Diesel",
    services: ["alignment", "balancing"],
    complaint: "Steering vibration at 80 kmph, slight pulling right",
    tyreItems: [],
    addons: [],
    inspection: {
      tyreWear: "Moderate",
      brakes: "Good",
      alignment: "Off",
      suspension: "OK",
      airPressure: "Normal",
    },
    tech: "Ramesh",
    startTime: "08:15",
    endTime: "09:00",
    workDone:
      "4-wheel alignment done, all 4 wheels balanced, pressure set to 33 PSI",
    prodItems: [],
    svcItems: [
      { name: "Wheel Alignment (4W)", qty: 1, rate: 600 },
      { name: "Wheel Balancing", qty: 4, rate: 400 },
    ],
    subtotal: 2200,
    discount: 200,
    gst: 360,
    total: 2000,
    payMode: "Card",
    payStatus: "paid",
    custApproval: true,
    photos: ["alignment_report"],
    staffNotes: "Fleet customer — add to loyalty. Due again at 66,000 km",
    nextService: "10-Jul-26",
    warrantyExpiry: "",
    aiSuggestions: [
      "Schedule tyre rotation at 60,000 km",
      "Right front tyre wear uneven — realign in 10,000 km",
    ],
    bay: 4,
    status: "done",
    eta: "Ready",
    totalEst: 2000,
    note: "",
  },
];

const WO_STATUS_ORDER = {
  tyre: ["received", "inbay", "inprog", "fixing", "qc", "done"],
  seafood: [
    "received",
    "cleaning",
    "processing",
    "freezing",
    "packing",
    "storage",
    "dispatch",
  ],
};

const statusTimelines = {
  tyre: [
    { icon: "🟡", label: "Job\nReceived", key: "received" },
    { icon: "🔧", label: "Vehicle\nIn Bay", key: "inbay" },
    { icon: "⚙️", label: "Work In\nProgress", key: "inprog" },
    { icon: "🛞", label: "Tyre/Align\nFixing", key: "fixing" },
    { icon: "✅", label: "Quality\nCheck", key: "qc" },
    { icon: "🚗", label: "Ready for\nDelivery", key: "done" },
  ],
  seafood: [
    { icon: "🟡", label: "Raw Mat.\nReceived", key: "received" },
    { icon: "🧼", label: "Cleaning/\nWashing", key: "cleaning" },
    { icon: "🔪", label: "Cutting/\nProcessing", key: "processing" },
    { icon: "❄️", label: "Freezing", key: "freezing" },
    { icon: "📦", label: "Packing", key: "packing" },
    { icon: "🏬", label: "Cold\nStorage", key: "storage" },
    { icon: "🚚", label: "Dispatch", key: "dispatch" },
  ],
};

const BAYS = [
  { num: "Bay 1", vehicle: "TN 37 CD 5678", occupied: true },
  { num: "Bay 2", vehicle: "TN 37 AB 1234", occupied: true },
  { num: "Bay 3", vehicle: "TN 37 EF 9012", occupied: true },
  { num: "Bay 4", vehicle: null, occupied: false },
];

const STATUS_STEPS = [
  "Check-in",
  "Diagnosed",
  "In Progress",
  "QC Check",
  "Ready",
  "Delivered",
];

const statusClass = (s) => {
  return (
    {
      pending: "ws-pending",
      inprog: "ws-inprog",
      qc: "ws-qc",
      done: "ws-done",
      delivered: "ws-delivered",
    }[s] || ""
  );
};

export default function WorkOrder({ industry = "tyre" }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const INDUSTRY_LABELS = {
    tyre: { title: "🔧 Work Orders", badge: "JOBS" },
    seafood: { title: "🦐 Batch Orders", badge: "BATCHES" },
    restaurant: { title: "🍽 Kitchen Orders", badge: "KOT" },
    supermarket: { title: "🛒 Pending Orders", badge: "QUEUE" },
  };

  const meta = INDUSTRY_LABELS[industry] || INDUSTRY_LABELS.tyre;

  return (
    <div className="wo-wrap">
      <div className="wo-ph">
        <span className="wo-ph-title">
          🔧 Tyre Work Orders <span className="wo-ph-badge">5 Active</span>
        </span>

        <div className="wo-ph-actions">
          <select className="sel">
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="inprog">In Progress</option>
            <option value="qc">QC</option>
            <option value="done">Done</option>
          </select>

          <button className="btn btn-p">+ New Work Order</button>
        </div>
      </div>

      <div className="wo-mg wo-mg-4">
        <div className="wo-mc wo-mc-pending">
          <div className="wo-mc-l">Pending</div>
          <div className="wo-mc-v">5</div>
          <div className="wo-mc-h">Awaiting bay</div>
        </div>

        <div className="wo-mc wo-mc-progress">
          <div className="wo-mc-l">In Progress</div>
          <div className="wo-mc-v">6</div>
          <div className="wo-mc-h">Active work</div>
        </div>

        <div className="wo-mc wo-mc-qc">
          <div className="wo-mc-l">Quality Check</div>
          <div className="wo-mc-v">7</div>
          <div className="wo-mc-h">Pre-delivery</div>
        </div>

        <div className="wo-mc wo-mc-done">
          <div className="wo-mc-l">Completed</div>
          <div className="wo-mc-v">8</div>
          <div className="wo-mc-h">Today</div>
        </div>
      </div>
      <div className="wo-bay-heading">🏭 Workshop Bay Map</div>
      <div className="wo-bay-map">
        {BAYS.map((bay) => (
          <div
            key={bay.num}
            className={`wo-bay${bay.occupied ? " occupied" : " available"}`}
          >
            <div className="wo-bay-num">{bay.num}</div>
            <div className="wo-bay-status">
              {bay.occupied ? "🔧 In Service" : "✅ Available"}
            </div>
            {bay.vehicle && <div className="wo-bay-vehicle">{bay.vehicle}</div>}
          </div>
        ))}
      </div>
      <div className="wo-bay-heading">📋 Active Work Orders</div>
      {/* Work Order Cards */}
      <div className="wo-card-container">
        {tyreWorkOrders.map((wo) => {
          const stl = statusTimelines.tyre;
          const order = WO_STATUS_ORDER.tyre;
          const si = order.indexOf(wo.status);
          const svcLabels = {
            tyre_replace: "🛞 Tyre Replacement",
            alignment: "🎯 Alignment",
            balancing: "⚖ Balancing",
            puncture: "🔧 Puncture Repair",
            rotation: "🔄 Rotation",
            nitrogen: "💨 Nitrogen Filling",
            general: "🔍 General Check",
          };
          const inspColor = (v) =>
            v === "OK" || v === "Good" || v === "Normal"
              ? "is-ok"
              : v === "Bad" || v === "Critical" || v === "Very Low"
                ? "is-bad"
                : "is-warn";
          const inspIcon = (k) =>
            ({
              tyreWear: "🛞",
              brakes: "🛑",
              alignment: "🎯",
              suspension: "🔩",
              airPressure: "💨",
            })[k] || "🔍";
          const inspLabel = (k) =>
            ({
              tyreWear: "Tyre Wear",
              brakes: "Brakes",
              alignment: "Alignment",
              suspension: "Suspension",
              airPressure: "Air PSI",
            })[k] || k;
          const statusColors = {
            pending: "ws-pending",
            inbay: "ws-inprog",
            inprog: "ws-inprog",
            fixing: "ws-inprog",
            qc: "ws-qc",
            done: "ws-done",
            delivered: "ws-delivered",
          };
          const prodTotal = (wo.prodItems || []).reduce(
            (s, i) => s + i.qty * i.rate,
            0,
          );
          const svcTotal = (wo.svcItems || []).reduce(
            (s, i) => s + i.qty * i.rate,
            0,
          );
          const addonTotal = (wo.addons || []).reduce(
            (s, a) => s + a.qty * a.price,
            0,
          );
          const gstAmt =
            wo.gst || Math.round((prodTotal + svcTotal + addonTotal) * 0.18);
          return (
            <div class="wo-card-full">
              <div class="wo-card-hdr">
                <span class="wo-id">{wo.id}</span>
                <span
                  class={`wo-status ${statusColors[wo.status] || "ws-pending"}`}
                >
                  {wo.status.toUpperCase()}
                </span>
                <span className="wo-card-hdr-text">🏪 {wo.branch}</span>
                <span className="wo-card-hdr-text">
                  👤 Advisor: ${wo.advisor}
                </span>
                <span className="wo-card-hdr-text">
                  📅 {wo.date} ${wo.time}
                </span>
                <span className="wo-card-hdr-amount">
                  ₹{(wo.total || wo.totalEst || 0).toLocaleString("en-IN")}
                </span>
                {wo.status !== "done" ? (
                  <button class="btn btn-p btn-sm">→ Next Stage</button>
                ) : (
                  <button class="btn btn-g btn-sm">⭐ Invoice</button>
                )}
                <button class="btn btn-sm">📋 Full View</button>
              </div>

              <div class="wo-card-body">
                <div className="wo-cards-grid">
                  {/* CUSTOMER */}
                  <div>
                    <div class="wo-sec">
                      <div class="wo-sec-title">👤 Customer</div>
                      <div class="wo-grid-2">
                        <div class="wo-field">
                          <div class="wo-label">Name</div>
                          <div class="wo-value">{wo.cust}</div>
                        </div>
                        <div class="wo-field">
                          <div class="wo-label">Mobile</div>
                          <div class="wo-value mono accent">{wo.phone}</div>
                        </div>
                        {wo.email ? (
                          <div class="wo-field" style={{ gridColumn: "1/-1" }}>
                            <div class="wo-label">Email</div>
                            <div class="wo-value" style={{ fontSize: "11px" }}>
                              {wo.email}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {wo.address ? (
                          <div class="wo-field" style={{ gridColumn: "1/-1" }}>
                            <div class="wo-label">Address</div>
                            <div class="wo-value" style={{ fontSize: "11px" }}>
                              {wo.address}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {/* VEHICLES */}
                    <div class="wo-sec mt-4">
                      <div class="wo-sec-title">🚗 Vehicle</div>
                      <div class="wo-grid-2">
                        <div class="wo-field">
                          <div class="wo-label">Reg No.</div>
                          <div class="wo-value mono accent">{wo.vehicle}</div>
                        </div>
                        <div class="wo-field">
                          <div class="wo-label">Make/Model</div>
                          <div class="wo-value">{wo.make}</div>
                        </div>
                        <div class="wo-field">
                          <div class="wo-label">Type</div>
                          <div class="wo-value">{wo.vehType}</div>
                        </div>
                        <div class="wo-field">
                          <div class="wo-label">Odometer</div>
                          <div class="wo-value">
                            {wo.km
                              ? wo.km.toLocaleString("en-IN") + " km"
                              : "—"}
                          </div>
                        </div>
                        <div class="wo-field">
                          <div class="wo-label">Fuel</div>
                          <div class="wo-value">{wo.fuel || "—"}</div>
                        </div>
                        <div class="wo-field">
                          <div class="wo-label">Technician</div>
                          <div class="wo-value">👷 {wo.tech}</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        {wo.startTime ? (
                          <span className="wo-card-hdr-text">
                            ⏱ Start:{" "}
                            <b style={{ color: "var(--text)" }}>
                              {wo.startTime}
                            </b>
                          </span>
                        ) : (
                          ""
                        )}
                        &nbsp;
                        {wo.endTime ? (
                          <span className="wo-card-hdr-text">
                            End:{" "}
                            <b style={{ color: "var(--green)" }}>
                              {wo.endTime}
                            </b>
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  {/* SERVICES */}
                  <div>
                    <div className="wo-card-sec">
                      <div className="wo-card-sec-title">🔍 Services</div>

                      <div className="wo-card-tags mt-3">
                        {(wo.services || []).map((s, i) => (
                          <span key={i} className="wo-card-svc-tag">
                            {svcLabels[s] || s}
                          </span>
                        ))}
                      </div>

                      {wo.complaint && (
                        <div className="wo-card-complaint">
                          💬 "{wo.complaint}"
                        </div>
                      )}
                    </div>
                    <div className="wo-card-sec wo-card-mt">
                      <div className="wo-card-sec-title">🛞 Tyre Items</div>

                      {(wo.tyreItems || []).length ? (
                        wo.tyreItems.map((t, i) => (
                          <div key={i} className="wo-card-tyre-row">
                            <span className="wo-card-tyre-name">
                              {t.brand} {t.size}
                            </span>

                            <span className="wo-card-tyre-meta">
                              ×{t.qty} · {t.position}
                            </span>

                            <span
                              className={`wo-card-tag ${
                                t.condition === "New"
                                  ? "wo-card-tag-ok"
                                  : "wo-card-tag-grey"
                              }`}
                            >
                              {t.condition}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="wo-card-empty">No tyre replacement</div>
                      )}
                      {(wo.addons || []).length > 0 && (
                        <>
                          <div className="wo-card-addon-title">Add-ons</div>

                          {wo.addons.map((a, i) => (
                            <div key={i} className="wo-card-addon-row">
                              <span>
                                {a.name} ×{a.qty}
                              </span>
                              <span>
                                ₹{(a.qty * a.price).toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    {wo.workDone && (
                      <div className="wo-card-sec wo-card-mt">
                        <div className="wo-card-sec-title">✅ Work Done</div>

                        <div className="wo-card-workdone">{wo.workDone}</div>
                      </div>
                    )}
                  </div>
                  {/* INSPECTION */}
                  <div>
                    <div className="wo-sec">
                      <div className="wo-card-sec-title">
                        🔍 Inspection Checklist
                      </div>
                      <div className="insp-grid">
                        {Object.entries(wo.inspection || {}).map(([k, v]) => (
                          <div className="insp-item" key={k}>
                            <span className="insp-icon">{inspIcon(k)}</span>
                            <div className="insp-label">{inspLabel(k)}</div>
                            <div className={`insp-status ${inspColor(v)}`}>
                              {v}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Billing */}
                    <div className="wo-sec wo-card-mt">
                      <div className="wo-sec-title">💰 Billing Summary</div>

                      {(wo.prodItems || []).map((i, idx) => (
                        <div className="wo-bill-row" key={`prod-${idx}`}>
                          <span className="wo-card-muted">
                            {i.name} ×{i.qty}
                          </span>
                          <span>
                            ₹{(i.qty * i.rate).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}

                      {(wo.svcItems || []).map((i, idx) => (
                        <div className="wo-bill-row" key={`svc-${idx}`}>
                          <span className="wo-card-muted">{i.name}</span>
                          <span>
                            ₹{(i.qty * i.rate).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}

                      {wo.discount && (
                        <div className="wo-bill-row disc-row">
                          <span>Discount</span>
                          <span>−₹{wo.discount.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      <div className="wo-bill-row gst-row">
                        <span>GST (18%)</span>
                        <span>₹{gstAmt.toLocaleString("en-IN")}</span>
                      </div>

                      <div className="wo-bill-row total-row">
                        <span>TOTAL</span>
                        <span className="wo-card-accent">
                          ₹
                          {(wo.total || wo.totalEst || 0).toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>

                      <div className="wo-card-pay-row">
                        <span className="wo-card-muted">
                          💳 {wo.payMode || "—"}
                        </span>
                        <span
                          className={
                            wo.payStatus === "paid"
                              ? "pay-status-paid"
                              : "pay-status-pend"
                          }
                        >
                          {wo.payStatus === "paid" ? "✓ PAID" : "⏳ PENDING"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Timeline */}
                  <div className="status-timeline">
                    {stl.map((step, idx) => {
                      const isDone = idx < si;
                      const isActive = idx === si;

                      return (
                        <React.Fragment key={step.key}>
                          <div
                            className={`stl-step ${isDone ? "done" : ""} ${
                              isActive ? "active" : ""
                            }`}
                          >
                            <div className="stl-icon">{step.icon}</div>
                            <div>
                              {step.label.split("\n").map((line, i) => (
                                <div className="stl-label" key={i}>
                                  {line}
                                </div>
                              ))}
                            </div>
                          </div>
                          {idx < stl.length - 1 && (
                            <div
                              className={`stl-line ${isDone ? "done" : ""}`}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Bottom Grid */}
                  <div className="wo-card-bottom-grid">
                    {/* AI Suggestions */}
                    <div className="wo-sec">
                      <div className="wo-sec-title">🤖 AI Suggestions</div>

                      {(wo.aiSuggestions || []).length ? (
                        wo.aiSuggestions.map((s, i) => (
                          <div className="ai-sug" key={i}>
                            <span className="ai-sug-icon">💡</span>
                            <span className="ai-sug-text">{s}</span>
                          </div>
                        ))
                      ) : (
                        <div className="wo-card-bottom-muted">
                          No suggestions
                        </div>
                      )}
                    </div>

                    {/* Photos */}
                    <div className="wo-sec">
                      <div className="wo-sec-title">📸 Photos & Approval</div>

                      <div className="photo-slots wo-card-bottom-mb">
                        <div
                          className={`photo-slot ${
                            wo.photos?.includes("before_tyre") ||
                            wo.photos?.includes("before_rear")
                              ? "filled"
                              : ""
                          }`}
                          onClick={() =>
                            toast("Photo upload (connect camera)", "info")
                          }
                        >
                          <span className="photo-slot-icon">📷</span>
                          <span className="photo-slot-label">Before</span>
                        </div>

                        <div
                          className={`photo-slot ${
                            wo.photos?.includes("after_tyre") ? "filled" : ""
                          }`}
                          onClick={() =>
                            toast("Photo upload (connect camera)", "info")
                          }
                        >
                          <span className="photo-slot-icon">📸</span>
                          <span className="photo-slot-label">After</span>
                        </div>

                        <div
                          className={`photo-slot ${
                            wo.photos?.includes("alignment_report")
                              ? "filled"
                              : ""
                          }`}
                          onClick={() =>
                            toast("Photo upload (connect camera)", "info")
                          }
                        >
                          <span className="photo-slot-icon">📊</span>
                          <span className="photo-slot-label">Report</span>
                        </div>

                        <div
                          className="photo-slot"
                          onClick={() => toast("Add more photos", "info")}
                        >
                          <span className="photo-slot-icon">➕</span>
                          <span className="photo-slot-label">Add</span>
                        </div>
                      </div>

                      <div className="wo-card-bottom-sign-wrap">
                        <div
                          className={`sig-pad ${
                            wo.custApproval ? "signed" : ""
                          } wo-card-bottom-sign`}
                        >
                          {wo.custApproval
                            ? "✅ Customer Approved"
                            : "✍ Tap to Sign / OTP"}
                        </div>
                      </div>
                    </div>

                    {/* Followup */}
                    <div className="wo-sec">
                      <div className="wo-sec-title">⏰ Follow-up & Comms</div>

                      {wo.nextService && (
                        <div className="wo-card-bottom-row">
                          📅 Next Service:
                          <b className="wo-card-bottom-accent">
                            {wo.nextService}
                          </b>
                        </div>
                      )}

                      {wo.warrantyExpiry && (
                        <div className="wo-card-bottom-row">
                          🛡 Warranty:
                          <b className="wo-card-bottom-green">
                            {wo.warrantyExpiry}
                          </b>
                        </div>
                      )}

                      {wo.staffNotes && (
                        <div className="wo-card-bottom-note">
                          📝 {wo.staffNotes}
                        </div>
                      )}

                      <div className="wo-card-bottom-actions">
                        <button className="btn btn-sm wo-card-bottom-btn">
                          📱 WA Track
                        </button>

                        <button
                          className="btn btn-sm wo-card-bottom-btn"
                          onClick={() =>
                            toast.info("Invoice sent via WhatsApp!", "ok")
                          }
                        >
                          🧾 WA Invoice
                        </button>

                        <button
                          className="btn btn-sm wo-card-bottom-btn"
                          onClick={() => toast("Reminder set!", "ok")}
                        >
                          ⏰ Remind
                        </button>
                      </div>

                      <div className="track-link wo-card-bottom-track">
                        <span className="wo-card-bottom-muted">🔗</span>
                        <span className="track-url">
                          tranzoop.app/track/{wo.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
