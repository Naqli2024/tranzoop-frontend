import React, { useEffect, useState } from "react";
import { getCustomerById } from "../../../redux/POS/CustomerSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const WO_STATUS_ORDER = ["pending", "inbay", "inprog", "fixing", "qc", "done"];

const statusTimelines = [
  { icon: "🟡", label: "Job\nReceived", key: "pending" },
  { icon: "🔧", label: "Vehicle\nIn Bay", key: "inbay" },
  { icon: "⚙️", label: "Work In\nProgress", key: "inprog" },
  { icon: "🛞", label: "Fixing", key: "fixing" },
  { icon: "✅", label: "Quality\nCheck", key: "qc" },
  { icon: "🚗", label: "Ready", key: "done" },
];

const WorkOrderDetails = ({ backToList, wo }) => {
    const [customerData, setCustomerData] = useState();
    const dispatch = useDispatch();

        useEffect(() => {
      dispatch(getCustomerById(wo.customerId))
        .unwrap()
        .then((response) => {
          setCustomerData(response.data);
        })
        .catch((error) => {
          toast.error(error);
        })
    }, [dispatch, wo?.customerId]);
  if (!wo) return null;

  const mapStatus = {
    CREATED: "pending",
    COMPLETED: "done",
  };

  const uiStatus = mapStatus[wo.status] || "pending";
  const si = WO_STATUS_ORDER.indexOf(uiStatus);

  const statusColors = {
    pending: "ws-pending",
    inbay: "ws-inprog",
    inprog: "ws-inprog",
    fixing: "ws-inprog",
    qc: "ws-qc",
    done: "ws-done",
  };

  const tyreTotal = (wo.tyres || []).reduce(
    (s, t) => s + t.quantity * t.mrp,
    0
  );

  const serviceTotal = (wo.services || []).reduce(
    (s, s2) => s + s2.price,
    0
  );

  const otherService = wo.otherService?.price || 0;

  const additionalTotal = (wo.additionalItems || []).reduce(
    (s, a) => s + a.qty * a.price,
    0
  );

  const total = tyreTotal + serviceTotal + otherService + additionalTotal;



  return (
    <div className="wo-card-container">
      <button className="btn back-btn btn-p mb-3" onClick={backToList}>
        ← Back
      </button>

      <div className="wo-card-full">
        {/* HEADER */}
        <div className="wo-card-hdr">
          <span className="wo-id">{wo.woNumber}</span>

          <span className={`wo-status ${statusColors[uiStatus]}`}>
            {wo.status}
          </span>

          <span className="wo-card-hdr-text">
            👤 Advisor: {wo.advisor}
          </span>

          <span className="wo-card-hdr-text">
            📅 {new Date(wo.createdAt).toLocaleString("en-IN")}
          </span>

          <span className="wo-card-hdr-amount">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>

        {/* BODY */}
        <div className="wo-card-body">
          <div className="wo-cards-grid">
            {/* CUSTOMER */}
            <div className="wo-sec">
              <div className="wo-sec-title">👤 Customer</div>
              <div className="wo-field">
                <div className="wo-label">Customer ID</div>
                <div className="wo-value">{wo.customerId}</div>
              </div>
              <div className="wo-field mt-3">
                <div className="wo-label">Customer Name</div>
                <div className="wo-value">{customerData?.fullName || "—"}</div>
              </div>
              <div className="wo-field my-3">
                <div className="wo-label">Mobile Number</div>
                <div className="wo-value">{customerData?.mobile || "—"}</div>
              </div>
              <div className="wo-field">
                <div className="wo-label">Address</div>
                <div className="wo-value">{customerData?.address || "—"}</div>
              </div>
            </div>

            {/* VEHICLE */}
            <div className="wo-sec">
              <div className="wo-sec-title">🚗 Vehicle</div>

              <div className="wo-field">
                <div className="wo-label">Reg No</div>
                <div className="wo-value">
                  {wo.vehicle?.registrationNo}
                </div>
              </div>

              <div className="wo-field mt-3">
                <div className="wo-label">Model</div>
                <div className="wo-value">
                  {wo.vehicle?.brandModel}
                </div>
              </div>

              <div className="wo-field mt-3">
                <div className="wo-label">Type</div>
                <div className="wo-value">
                  {wo.vehicle?.vehicleType}
                </div>
              </div>

              <div className="wo-field mt-3">
                <div className="wo-label">Odometer</div>
                <div className="wo-value">
                  {wo.vehicle?.odometer || "—"}
                </div>
              </div>

              <div className="wo-field mt-3">
                <div className="wo-label">Fuel</div>
                <div className="wo-value">
                  {wo.vehicle?.fuelType || "—"}
                </div>
              </div>

              <div className="wo-field mt-3">
                <div className="wo-label">Technician</div>
                <div className="wo-value">
                  {wo.technicianName || "Not Assigned"}
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="wo-sec">
              <div className="wo-sec-title">🔧 Services</div>

              {(wo.services || []).map((s, i) => (
                <div className="wo-value" key={i}>
                  {s.name} - ₹{s.price}
                </div>
              ))}

              {wo.otherService?.description && (
                <div className="wo-value mt-3">
                  <div className="wo-label">Other Services</div>
                  {wo.otherService.description} - ₹
                  {wo.otherService.price}
                </div>
              )}

              <div className="wo-card-complaint">
                <div className="wo-label">💬 Complaints</div>
                <div className="wo-value">{wo.complaints}</div>
              </div>
            </div>

            {/* TYRES */}
            <div className="wo-sec">
              <div className="wo-sec-title">🛞 Tyres</div>

              {(wo.tyres || []).map((t, i) => (
                <div className="wo-value mb-3" key={i}>
                  {t.brand} {t.quantity} * ({t.position}) - ₹{t.mrp}
                  <div className="wo-value"><span className="wo-label">Size</span> - {t.size}</div>
                </div>
              ))}
            </div>

            {/* ADDITIONAL */}
            <div className="wo-sec">
              <div className="wo-sec-title">➕ Additional Items</div>

              {(wo.additionalItems || []).map((a, i) => (
                <div key={i} className="wo-value mb-3">
                  {a.name} ×{a.qty} - ₹{a.price}
                </div>
              ))}
            </div>

            {/* INSPECTION */}
            <div className="wo-sec">
              <div className="wo-sec-title">🔍 Inspection</div>

              {Object.entries(wo.inspection || {}).map(([k, v]) => (
                <div className="wo-value" key={k}>
                  {k} : {v ? "Checked" : "Issue"}
                </div>
              ))}
            </div>

            {/* BILLING */}
            <div className="wo-sec">
              <div className="wo-sec-title">💰 Billing</div>

              <div className="wo-value mb-2">Tyres: ₹{tyreTotal}</div>
              <div className="wo-value mb-2">Services: ₹{serviceTotal}</div>
              <div className="wo-value mb-2">Other Services: ₹{otherService}</div>
              <div className="wo-value mb-2">Additional Items: ₹{additionalTotal}</div>
              <hr />
              <b>Total: ₹{total}</b>
            </div>
          </div>

          {/* STATUS TIMELINE */}
          {/* <div className="status-timeline mt-4">
            {statusTimelines.map((step, idx) => {
              const isDone = idx < si;
              const isActive = idx === si;

              return (
                <React.Fragment key={step.key}>
                  <div
                    className={`stl-step ${
                      isDone ? "done" : ""
                    } ${isActive ? "active" : ""}`}
                  >
                    <div>{step.icon}</div>
                    <div>
                      {step.label.split("\n").map((l, i) => (
                        <div key={i}>{l}</div>
                      ))}
                    </div>
                  </div>

                  {idx < statusTimelines.length - 1 && (
                    <div className={`stl-line ${isDone ? "done" : ""}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetails;