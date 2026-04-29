import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getAllCustomers } from "../../../redux/POS/CustomerSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { getUserById } from "../../../redux/Auth/AuthSlice";
import { getBillByCustomerId } from "../../../redux/POS/BillSlice";
import { MdOutlineCancel } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { createWorkOrder, getAllOrderByBusinessId, updateWorkOrder } from "../../../redux/POS/WorkOrderSlice";

const SERVICE_TYPES = [
  { id: "Tyre Replacement", label: "Tyre Replacement", icon: "🛞" },
  { id: "Wheel Alignment", label: "Wheel Alignment", icon: "🎯" },
  { id: "Wheel Balancing", label: "Wheel Balancing", icon: "⚖️" },
  { id: "Puncture Repair", label: "Puncture Repair", icon: "🔧" },
  { id: "Rotation", label: "Rotation", icon: "🔄" },
  { id: "Nitrogen Filling", label: "Nitrogen Filling", icon: "💨" },
  { id: "General Check", label: "General Check", icon: "🔍" },
  { id: "other", label: "Other Service", icon: "⚙️" },
];

const TYRE_POSITIONS = [
  { id: "FL", label: "Front Left", icon: "🔼" },
  { id: "FR", label: "Front Right", icon: "🔼" },
  { id: "RL", label: "Rear Left", icon: "🔽" },
  { id: "RR", label: "Rear Right", icon: "🔽" },
  { id: "SPARE", label: "Spare", icon: "🔘" },
];

const INSPECTION_ITEMS = [
  {
    key: "tyreWear",
    icon: "🛞",
    label: "Tyre Wear Condition",
  },
  {
    key: "brakes",
    icon: "🛑",
    label: "Brake Condition",
  },
  {
    key: "alignment",
    icon: "🎯",
    label: "Wheel Alignment",
  },
  {
    key: "suspension",
    icon: "🔩",
    label: "Suspension Check",
  },
  {
    key: "airPressure",
    icon: "💨",
    label: "Air Pressure (PSI)",
  },
  {
    key: "brakeFluid",
    icon: "🔬",
    label: "Brake Fluid Level",
  },
];

const TABS = [
  { id: "customer", label: "👤 Customer" },
  { id: "vehicle", label: "🚗 Vehicle" },
  { id: "services", label: "🔧 Services" },
  { id: "tyres", label: "🛞 Tyres" },
  { id: "inspection", label: "🔍 Inspection" },
];

function getNowDT() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-GB", { month: "short" });
  const year = d.getFullYear();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return { date: `${day} ${month} ${year}`, time: `${h}:${m}` };
}

const FL = ({ children }) => <div className="wo-fl">{children}</div>;

/* ── PAGE 1: CUSTOMER ── */
function CustomerPage({
  form,
  setForm,
  customerData,
  selectedCustomer,
  setSelectedCustomer,
  customerBills,
  billLoading,
}) {
  const handleSelectCustomer = (id) => {
    const cust = customerData.find((c) => c._id === id);
    setSelectedCustomer(cust);

    setForm((f) => ({
      ...f,
      customerId: cust?._id || "",
      cname: cust?.fullName || "",
      cphone: cust?.mobile || "",
      caddr: cust?.address || "",
      cType: cust?.type || "",
    }));
  };

  return (
    <div className="wo-page">
      <div className="wo-grid wo-grid--2">
        <div className="wo-fg">
          <FL>Select Customer</FL>
          <select
            className="wo-sel"
            value={String(form.customerId || "")}
            onChange={(e) => handleSelectCustomer(e.target.value)}
          >
            <option value="">-- Select Customer --</option>
            {customerData.map((c) => (
              <option key={c._id} value={String(c._id)}>
                {c.fullName}
              </option>
            ))}
          </select>
        </div>
        <div className="wo-fg">
          <FL>Advisor Name</FL>
          <input
            className="wo-inp"
            value={form.advisor}
            onChange={(e) =>
              setForm((f) => ({ ...f, advisor: e.target.value }))
            }
          />
        </div>

        <div className="wo-fg">
          <FL>Mobile</FL>
          <input className="wo-inp" value={form.cphone} readOnly />
        </div>

        <div className="wo-fg">
          <FL>Customer Type</FL>
          <input className="wo-inp" value={form.cType} readOnly />
        </div>
      </div>

      <div className="wo-fg" style={{ marginBottom: 14 }}>
        <FL>Address</FL>
        <textarea
          className="wo-inp wo-textarea"
          rows={2}
          value={form.caddr}
          readOnly
        />
      </div>
      <div className="wo-hist-box">
        <div className="wo-sec-lbl">Service History (Past Visits)</div>

        {billLoading ? (
          <div className="wo-hist-empty">Loading history...</div>
        ) : customerBills?.bills?.length > 0 ? (
          customerBills.bills.map((bill, i) => (
            <div key={i} className="wo-hist-row">
              <span className="wo-tag wo-tag--grey">
                {new Date(bill.createdAt).toLocaleDateString("en-IN")}
              </span>

              <span className="wo-hist-desc">
                {bill.items.map((it) => it.itemName).join(", ")}
              </span>

              <span className="wo-hist-amt">
                ₹{Number(bill.grandTotal || 0).toLocaleString("en-IN")}
              </span>
            </div>
          ))
        ) : (
          <div className="wo-hist-empty text-center mt-3">
            {customerBills?.message || "No history found"}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── PAGE 2: VEHICLE ── */
function VehiclePage({ form, setForm }) {
  const setVehicle = (key) => (e) =>
    setForm((f) => ({
      ...f,
      vehicle: {
        ...f.vehicle,
        [key]: e.target.value,
      },
    }));
  const vehicle = form.vehicle || {};

  return (
    <div className="wo-page">
      <div className="wo-grid wo-grid--3" style={{ marginBottom: 10 }}>
        <div className="wo-fg">
          <FL>Vehicle Reg No. *</FL>
          <input
            className="wo-inp"
            placeholder="TN38 AB 1234"
            style={{ textTransform: "uppercase" }}
            value={vehicle.registrationNo || ""}
            onChange={setVehicle("registrationNo")}
          />
        </div>
        <div className="wo-fg">
          <FL>Brand &amp; Model</FL>
          <input
            className="wo-inp"
            placeholder="Honda Activa 6G"
            value={vehicle.brandModel || ""}
            onChange={setVehicle("brandModel")}
          />
        </div>
        <div className="wo-fg">
          <FL>Vehicle Type</FL>
          <select
            className="wo-sel"
            value={vehicle.vehicleType || ""}
            onChange={setVehicle("vehicleType")}
          >
            <option value={""}>Select</option>
            <option>2-Wheeler (Scooter)</option>
            <option>2-Wheeler (Motorcycle)</option>
            <option>Car / Sedan</option>
            <option>SUV / MUV</option>
            <option>Truck / LCV</option>
            <option>Bus / HCV</option>
            <option>Tractor / Agricultural</option>
            <option>3-Wheeler</option>
          </select>
        </div>
      </div>
      <div className="wo-grid wo-grid--3" style={{ marginBottom: 10 }}>
        <div className="wo-fg">
          <FL>Odometer (km) *</FL>
          <input
            className="wo-inp"
            type="number"
            placeholder="24500"
            value={vehicle.odometer || ""}
            onChange={setVehicle("odometer")}
          />
        </div>
        <div className="wo-fg">
          <FL>Fuel Type</FL>
          <select className="wo-sel" value={vehicle.fuelType || ""} onChange={setVehicle("fuelType")}>
            <option value={""}>Select</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>CNG</option>
            <option>Electric</option>
            <option>LPG</option>
          </select>
        </div>
        <div className="wo-fg">
          <FL>Year of Manufacture</FL>
          <input
            className="wo-inp"
            placeholder="2022"
            value={vehicle.yearOfManufacture || ""}
            onChange={setVehicle("yearOfManufacture")}
          />
        </div>
      </div>
      <div className="wo-grid wo-grid--1">
        <div className="wo-fg">
          <FL>Assign Technician</FL>
          <input
            className="wo-inp"
            placeholder="Ramesh"
            value={form.technicianName}
            onChange={(e) =>
              setForm((f) => ({ ...f, technicianName: e.target.value }))
            } />
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 3: SERVICES ── */
function ServicesPage({ form, setForm }) {
  const isOtherSelected = !!form.otherService;
  const toggle = (service) => {
    setForm((f) => {
      const services = f.services || [];
      const exists = services.find((s) => s.name === service.id);
      if (service.id === "other") {
        return {
          ...f,
          otherService: f.otherService
            ? null
            : {
              description: "",
              price: "",
              gst: "",
            },
        };
      }

      return {
        ...f,
        services: exists
          ? services.filter((s) => s.name !== service.id)
          : [...services, { name: service.id, price: "", gst: "" }],
      };
    });
  };
  return (
    <div className="wo-page">
      <div className="wo-sec-lbl" style={{ marginBottom: 10 }}>
        Select Job Type(s)
      </div>
      <div className="wo-svc-grid">
        {SERVICE_TYPES.map((s) => (
          <button
            key={s.id}
            className={`wo-svc-chip${s.id === "other"
              ? form.otherService
                ? " wo-svc-chip--active"
                : ""
              : (form.services || []).some((srv) => srv.name === s.id)
                ? " wo-svc-chip--active"
                : ""
              }`}
            onClick={() => toggle(s)}
          >
            <span className="wo-svc-icon">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
      {(form.services || [])
        .filter((srv) => srv.name !== "other")
        .map((srv, i) => (
          <div key={i} className="wo-grid wo-grid--3 mt-2">
            <div className="wo-fg">
              <FL>{SERVICE_TYPES.find((s) => s.id === srv.name)?.label}</FL>
            </div>

            <div className="wo-fg">
              <FL>Price</FL>
              <input
                className="wo-inp"
                type="number"
                value={srv.price}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((f) => {
                    const updated = [...f.services];
                    updated[i].price = val;
                    return { ...f, services: updated };
                  });
                }}
              />
            </div>

            <div className="wo-fg">
              <FL>GST (%)</FL>
              <input
                className="wo-inp"
                type="number"
                value={srv.gst}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((f) => {
                    const updated = [...f.services];
                    updated[i].gst = val;
                    return { ...f, services: updated };
                  });
                }}
              />
            </div>
          </div>
        ))}
      {isOtherSelected && (
        <div className="wo-other-box">
          <div className="wo-sec-lbl mb-2">Other Service Details</div>
          <div className="wo-grid wo-grid--3">
            <div className="wo-fg">
              <FL>Description</FL>
              <input
                className="wo-inp"
                placeholder="Service name"
                value={form.otherService.description || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    otherService: {
                      ...f.otherService,
                      description: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="wo-fg">
              <FL>Price (₹)</FL>
              <input
                className="wo-inp"
                type="number"
                placeholder="0"
                value={form.otherService.price}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    otherService: {
                      ...f.otherService,
                      price: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="wo-fg">
              <FL>GST (%)</FL>
              <input
                className="wo-inp"
                type="number"
                placeholder="18"
                value={form.otherService.gst}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    otherService: {
                      ...f.otherService,
                      gst: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}
      <div className="wo-fg" style={{ marginBottom: 10 }}>
        <FL>Customer Complaint / Request Notes *</FL>
        <textarea
          className="wo-inp wo-textarea"
          rows={3}
          placeholder="Describe the complaint in detail..."
          value={form.complaints}
          onChange={(e) =>
            setForm((f) => ({ ...f, complaints: e.target.value }))
          }
        />
      </div>
    </div>
  );
}

/* ── PAGE 4: TYRES ── */
function TyresPage({ form, setForm }) {
  const tyres = form.tyres || [];
  const additionalItems = form.additionalItems || [];
  const togglePos = (id) =>
    setForm((f) => {
      const tyres = f.tyres || [];
      const exists = tyres.find((t) => t.position === id);

      return {
        ...f,
        tyres: exists
          ? tyres.filter((t) => t.position !== id)
          : [
            ...tyres,
            {
              position: id,
              brand: "",
              size: "",
              quantity: 1,
              mrp: "",
            },
          ],
      };
    });

  const addItem = () => {
    setForm((f) => ({
      ...f,
      additionalItems: [...f.additionalItems, { name: "", price: "", qty: 1 }],
    }));
  };

  const removeItem = (index) => {
    setForm((f) => ({
      ...f,
      additionalItems: f.additionalItems.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="wo-page">
      <div className="wo-sec-lbl" style={{ marginBottom: 10 }}>
        Tyre Position Map
      </div>
      <div className="wo-tyre-pos-grid">
        {TYRE_POSITIONS.map((p) => (
          <div
            key={p.id}
            className={`wo-tyre-pos${(tyres || []).some((t) => t.position === p.id) ? " wo-tyre-pos--sel" : ""}`}
            onClick={() => togglePos(p.id)}
          >
            <div className="wo-tyre-pos-icon">{p.icon}</div>
            <div className="wo-tyre-pos-lbl">{p.label}</div>
          </div>
        ))}
      </div>

      <div className="wo-sec-lbl" style={{ marginBottom: 8 }}>
        Tyre Details
      </div>
      {(form.tyres || []).map((tyre, index) => (
        <div key={index} className="wo-grid wo-grid--4 mt-2">
          <div className="wo-fg">
            <FL>({tyre.position.toUpperCase()}) Brand</FL>
            <input
              className="wo-inp"
              value={tyre.brand}
              onChange={(e) => {
                const val = e.target.value;
                setForm((f) => {
                  const updated = [...f.tyres];
                  updated[index].brand = val;
                  return { ...f, tyres: updated };
                });
              }}
            />
          </div>

          <div className="wo-fg">
            <FL>Size</FL>
            <input
              className="wo-inp"
              value={tyre.size}
              onChange={(e) => {
                const val = e.target.value;
                setForm((f) => {
                  const updated = [...f.tyres];
                  updated[index].size = val;
                  return { ...f, tyres: updated };
                });
              }}
            />
          </div>

          <div className="wo-fg">
            <FL>Qty</FL>
            <input
              type="number"
              className="wo-inp"
              value={tyre.quantity}
              onChange={(e) => {
                const val = e.target.value;
                setForm((f) => {
                  const updated = [...f.tyres];
                  updated[index].quantity = val;
                  return { ...f, tyres: updated };
                });
              }}
            />
          </div>

          <div className="wo-fg">
            <FL>MRP</FL>
            <input
              type="number"
              className="wo-inp"
              value={tyre.mrp}
              onChange={(e) => {
                const val = e.target.value;
                setForm((f) => {
                  const updated = [...f.tyres];
                  updated[index].mrp = val;
                  return { ...f, tyres: updated };
                });
              }}
            />
          </div>
        </div>
      ))}
      <hr />
      <div className="wo-addons-row">
        <div className="wo-other-box">
          <div className="wo-sec-lbl mb-2">
            Additional Items ({additionalItems.length})
          </div>
          {additionalItems.map((item, index) => (
            <div>
              <div key={index} className="wo-grid wo-grid--4">
                <div className="wo-fg">
                  <FL>Name</FL>
                  <input
                    className="wo-inp"
                    placeholder="Service name"
                    value={item.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((f) => {
                        const updated = [...f.additionalItems];
                        updated[index].name = val;
                        return { ...f, additionalItems: updated };
                      });
                    }}
                  />
                </div>
                <div className="wo-fg">
                  <FL>Price (₹)</FL>
                  <input
                    className="wo-inp"
                    type="number"
                    value={item.price}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((f) => {
                        const updated = [...f.additionalItems];
                        updated[index].price = val;
                        return { ...f, additionalItems: updated };
                      });
                    }}
                  />
                </div>
                <div className="wo-fg">
                  <FL>Qty</FL>
                  <input
                    className="wo-inp"
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((f) => {
                        const updated = [...f.additionalItems];
                        updated[index].qty = val;
                        return { ...f, additionalItems: updated };
                      });
                    }}
                  />
                </div>
                <div
                  className="wo-fg"
                  style={{ display: "flex", alignItems: "end" }}
                >
                  {form.additionalItems.length > 1 && (
                    <div onClick={() => removeItem(index)}>
                      <MdOutlineCancel
                        size={20}
                        color="red"
                        cursor={"pointer"}
                      />
                    </div>
                  )}
                </div>
              </div>
              {index !== form.additionalItems.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="wo-btn-add" onClick={addItem}>
        <IoAddCircleOutline size={20} /> Add Item
      </button>
    </div>
  );
}

/* ── PAGE 5: INSPECTION ── */
function InspectionPage({ form, setForm }) {
  const setInsp = (key, val) =>
    setForm((f) => ({
      ...f,
      inspection: { ...f.inspection, [key]: val },
    }));
  return (
    <div className="wo-page">
      <div className="wo-sec-lbl" style={{ marginBottom: 10 }}>
        Tick-based Inspection Checklist
      </div>
      <div className="wo-insp-grid">
        {INSPECTION_ITEMS.map((item) => (
          <div key={item.key} className="wo-insp-card">
            <div className="wo-insp-lbl">
              {item.icon} {item.label}
            </div>
            <select
              className="wo-sel"
              value={form.inspection[item.key] ?? false}
              onChange={(e) => setInsp(item.key, e.target.value === "true")}
            >
              <option value="false">Not Checked</option>
              <option value="true">Checked</option>
            </select>
          </div>
        ))}
      </div>
      <div className="wo-fg" style={{ marginTop: 12 }}>
        <FL>Additional Inspection Notes</FL>
        <textarea
          className="wo-inp wo-textarea"
          rows={2}
          placeholder="Any additional findings..."
          value={form.inspectionNotes}
          onChange={(e) =>
            setForm((f) => ({ ...f, inspectionNotes: e.target.value }))
          }
        />
      </div>
    </div>
  );
}

const DEFAULT_FORM = {
  customerId: "",
  advisor: "",
  technicianName: "",

  vehicle: {
    registrationNo: "",
    brandModel: "",
    vehicleType: "",
    odometer: "",
    fuelType: "",
    yearOfManufacture: "",
  },

  complaints: "",
  services: [],
  otherService: {
    description: "",
    price: "",
    gst: "",
  },
  tyres: [],
  inspection: {},
  inspectionNotes: "",
  additionalItems: [{ name: "", price: "", qty: 1 }],
};
export default function AddWorkOrderModal({ closeModal, editData, setWoData }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [activeTab, setActiveTab] = useState("customer");
  const [form, setForm] = useState(DEFAULT_FORM);
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerBills, setCustomerBills] = useState([]);
  const [billLoading, setBillLoading] = useState(false);

  const { date: nowDate, time: nowTime } = useMemo(getNowDT, []);

  const handleSave = useCallback(() => {
    const payload = buildPayload(form, selectedCustomer);
    setLoading(true);

    const action = editData
      ? updateWorkOrder({ orderId: editData.woNumber, payload })
      : createWorkOrder(payload);

    dispatch(action)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        dispatch(getAllOrderByBusinessId())
          .unwrap()
          .then((response) => {
            setWoData(response.data || []);
          })
        closeModal();
      })
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));

  }, [form, selectedCustomer, editData]);

  useEffect(() => {
    if (!editData || customerData.length === 0) return;

    const cust = customerData.find(
      (c) => String(c._id) === String(editData.customerId)
    );

    if (!cust) return;

    setSelectedCustomer(cust);

    setForm((prev) => ({
      ...prev,
      customerId: String(cust._id),
      cname: cust.customerName || "",
      cphone: cust.mobile || "",
      caddr: cust.address || "",
      cType: cust.type || "",
    }));
  }, [editData, customerData]);

  useEffect(() => {
    if (editData && customerData.length) {
      const cust = customerData.find(c => c._id === editData.customerId);

      setSelectedCustomer(cust || null);

      setForm({
        ...DEFAULT_FORM,
        customerId: cust?._id || "",
        cname: cust?.customerName || "",
        cphone: cust?.mobile || "",
        caddr: cust?.address || "",
        cType: cust?.type || "",

        advisor: editData.advisor || "",
        technicianName: editData.technicianName || "",

        vehicle: {
          registrationNo: editData.vehicle?.registrationNo || "",
          brandModel: editData.vehicle?.brandModel || "",
          vehicleType: editData.vehicle?.vehicleType || "",
          odometer: editData.vehicle?.odometer || "",
          fuelType: editData.vehicle?.fuelType || "",
          yearOfManufacture: editData.vehicle?.yearOfManufacture || "",
        },

        complaints: editData.complaints || "",
        services: editData.services || [],
        otherService: editData.otherService || {},

        tyres: editData.tyres || [],
        inspection: editData.inspection || {},
        inspectionNotes: editData.inspectionNotes || "",

        additionalItems:
          editData.additionalItems?.length > 0
            ? editData.additionalItems
            : [{ name: "", price: "", qty: 1 }],
      });
    }
  }, [editData, customerData]);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllCustomers())
      .unwrap()
      .then((response) => {
        setCustomerData(response.data || []);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    dispatch(getUserById())
      .unwrap()
      .then((response) => {
        setUserData(response || []);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCustomer?._id) return;
    setBillLoading(true);
    setCustomerBills({ bills: [], message: "" });
    dispatch(getBillByCustomerId(selectedCustomer._id))
      .unwrap()
      .then((res) => {
        if (res?.data) {
          setCustomerBills(res.data);
        } else {
          setCustomerBills({ bills: [] });
        }
      })
      .catch((err) => toast.error(err))
      .finally(() => setBillLoading(false));
  }, [selectedCustomer, dispatch]);

  const buildPayload = (form, selectedCustomer) => {
    return {
      customerId: selectedCustomer?._id || form.customerId,

      advisor: form.advisor || "",
      technicianName: form.technicianName || "",

      vehicle: form.vehicle,

      complaints: form.complaints,
      services: (form.services || [])
        .filter(
          (s) =>
            s.name !== "other" &&
            s.price !== "" &&
            s.gst !== "" &&
            Number(s.price) > 0,
        )
        .map((s) => ({
          name: s.name,
          price: Number(s.price),
          gst: Number(s.gst),
        })),

      otherService: {
        description: form.otherService?.description || "",
        price: Number(form.otherService?.price || 0),
        gst: Number(form.otherService?.gst || 0),
      },

      tyres: form.tyres || [],

      inspection: Object.fromEntries(
        Object.entries(form.inspection || {}).map(([k, v]) => [k, !!v]),
      ),

      inspectionNotes: form.inspectionNotes || "",

      additionalItems: (form.additionalItems || [])
        .filter((i) => i.name)
        .map((i) => ({
          name: i.name,
          price: Number(i.price || 0),
          qty: Number(i.qty || 1),
        })),
    };
  };

  const renderPage = () => {
    switch (activeTab) {
      case "customer":
        return (
          <CustomerPage
            form={form}
            setForm={setForm}
            customerData={customerData}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            customerBills={customerBills}
            billLoading={billLoading}
          />
        );
      case "vehicle":
        return <VehiclePage form={form} setForm={setForm} />;
      case "services":
        return <ServicesPage form={form} setForm={setForm} />;
      case "tyres":
        return <TyresPage form={form} setForm={setForm} />;
      case "inspection":
        return <InspectionPage form={form} setForm={setForm} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div className="wo-overlay">
        <div className="wo-modal" onClick={(e) => e.stopPropagation()}>
          <div className="wo-mhdr">
            <span>🔧 New Tyre Work Order — Job Sheet</span>
            <button className="wo-mclose" onClick={closeModal}>
              ✕
            </button>
          </div>
          <div className="wo-meta-bar">
            <span>
              🏪 Branch:
              <b className="wo-meta-text">
                {userData?.business?.shopName || "Tyres"},
                {userData?.business?.address}
              </b>
            </span>
            <span>
              📅
              <b className="wo-meta-mono">
                {nowDate} &nbsp;{nowTime} pm
              </b>
            </span>
          </div>
          <div className="wo-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`wo-tab${activeTab === t.id ? " wo-tab--active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="wo-body">{renderPage()}</div>
          <div className="wo-mfoot">
            <button className="wo-btn" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="wo-btn wo-btn--accent"
              onClick={handleSave}
            >
              {editData ? "Update Work Order" : "Create Work Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
