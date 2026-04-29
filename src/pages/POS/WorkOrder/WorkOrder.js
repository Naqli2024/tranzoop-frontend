import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddWorkOrderModal from "./AddWorkOrderModal";
import { getAllOrderByBusinessId, completeWorkOrder, deleteByWorkOrder, assignBay } from "../../../redux/POS/WorkOrderSlice";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import WorkOrderDetails from "./WorkOrderDetails";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { createBill } from "../../../redux/POS/BillSlice";
import SelectPaymentModal from "../Payments/SelectPaymentModal";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import DiscountModal from "./DiscountModal";
import BillModal from "../POS/BillModal";

export default function WorkOrder({ industry = "tyre" }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [openAddWorkerOrderModal, setOpenAddWorkerOrderModal] = useState(false);
  const [woData, setWoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [woNumber, setWoNumber] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [dateFilter, setDateFilter] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [openWoDetails, setOpenWoDetails] = useState(false);
  const [selectedWO, setSelectedWO] = useState(null);
  const [assigningBayId, setAssigningBayId] = useState(null);
  const [bayInput, setBayInput] = useState("");
  const [openDiscount, setOpenDiscount] = useState(false);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [billData, setBillData] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllOrderByBusinessId())
      .unwrap()
      .then((response) => {
        const list = Array.isArray(response?.data) ? response.data : [];
        setWoData(list);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleCompleteToggle = async (wo) => {
    if (wo.status === "COMPLETED") return;
    try {
      const payload = {};
      await dispatch(completeWorkOrder({ orderId: wo.woNumber, payload }))
        .unwrap()
        .then((response) => {
          setWoData((prev) =>
            prev.map((item) =>
              item._id === wo._id
                ? {
                  ...item,
                  isActive: true,
                  status: "COMPLETED",
                }
                : item
            )
          );
          toast.success(response.message);
          dispatch(getAllOrderByBusinessId())
            .unwrap()
            .then((res) => setWoData(res.data || []));
        })
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async () => {
    if (!woNumber) return;
    try {
      setDeleteLoading(true);
      const response = await dispatch(deleteByWorkOrder({ orderId: woNumber }))
        .unwrap();
      dispatch(getAllOrderByBusinessId())
        .unwrap()
        .then((response) => {
          setWoData(response.data || []);
        })
      toast.success(response.message);
      setDeleteModal(false);
      setWoNumber(null);

    } catch (err) {
      toast.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAssignBay = async (orderId) => {
    if (!bayInput) return toast.error("Enter bay number");

    try {
      const payload = {
        bay: `Bay-${bayInput}`,
      };

      const response = await dispatch(
        assignBay({ orderId, payload })
      ).unwrap();

      toast.success(response.message);
      const res = await dispatch(getAllOrderByBusinessId()).unwrap();
      setWoData(res.data || []);
      setAssigningBayId(null);
      setBayInput("");
    } catch (err) {
      toast.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredData = woData.filter((wo) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      wo.woNumber?.toLowerCase().includes(searchText) ||
      wo.vehicle?.registrationNo?.toLowerCase().includes(searchText) ||
      wo.vehicle?.brandModel?.toLowerCase().includes(searchText) ||
      wo.advisor?.toLowerCase().includes(searchText);

    const matchesVehicle =
      !vehicleFilter || wo.vehicle?.vehicleType === vehicleFilter;

    const matchesService =
      !serviceFilter ||
      wo.services?.some((s) => s.name === serviceFilter);

    const matchesDate = (() => {
      if (!dateFilter) return true;

      const created = new Date(wo.createdAt);
      const now = new Date();

      if (dateFilter === "Today") {
        return created.toDateString() === now.toDateString();
      }

      if (dateFilter === "This Week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return created >= weekAgo;
      }

      if (dateFilter === "This Month") {
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      }

      if (dateFilter === "This Year") {
        return created.getFullYear() === now.getFullYear();
      }

      return true;
    })();

    return matchesSearch && matchesVehicle && matchesService && matchesDate;
  });

  const stats = {
    pending: 0,
    progress: 0,
    completed: 0,
  };

  woData.forEach((wo) => {
    if (wo.status === "CREATED") stats.pending++;
    else if (wo.status === "COMPLETED") stats.completed++;
    else stats.progress++;
  });

  const TOTAL_BAYS = 4;

  const dynamicBays = Array.from({ length: TOTAL_BAYS }, (_, i) => {
    const bayName = `Bay-${i + 1}`;

    const assignedWO = woData.find(
      (wo) => wo.bay === bayName && wo.bayStatus === "OCCUPIED"
    );

    return {
      num: bayName,
      occupied: !!assignedWO,
      vehicle: assignedWO?.vehicle?.registrationNo || null,
    };
  });

  return (
    <>
      {openWoDetails
        ? (<WorkOrderDetails backToList={() => setOpenWoDetails(false)} wo={selectedWO} />)
        : (<div className="wo-wrap">
          <div className="wo-ph">
            <span className="wo-ph-title">
              🔧 Tyre Work Orders <span className="wo-ph-badge">5 Active</span>
            </span>
            <div className="wo-ph-actions">
              <button
                className="btn btn-p"
                onClick={() => setOpenAddWorkerOrderModal(true)}
              >
                + New Work Order
              </button>
            </div>
          </div>

          <div className="wo-mg wo-mg-3">
            <div className="wo-mc wo-mc-pending">
              <div className="wo-mc-l">Pending</div>
              <div className="wo-mc-v">{stats.pending}</div>
              <div className="wo-mc-h">Awaiting bay</div>
            </div>

            <div className="wo-mc wo-mc-progress">
              <div className="wo-mc-l">In Progress</div>
              <div className="wo-mc-v">{stats.progress}</div>
              <div className="wo-mc-h">Active work</div>
            </div>
            <div className="wo-mc wo-mc-done">
              <div className="wo-mc-l">Completed</div>
              <div className="wo-mc-v">{stats.completed}</div>
              <div className="wo-mc-h">Today</div>
            </div>
          </div>
          <div className="wo-bay-heading">🏭 Workshop Bay Map</div>
          <div className="wo-bay-map">
            {dynamicBays.map((bay) => (
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
          <div class="items-filter-bar">
            <div className="items-input">
            <input
              class="items-inp"
              style={{ flex: "1", maxWidth: "300px" }}
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            <div className="d-flex gap-2">
              <select className="sel" onChange={(e) => setDateFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Year">This Year</option>
              </select>
              <select className="sel" onChange={(e) => setVehicleFilter(e.target.value)}>
                <option value="">Vehicle Type</option>
                <option>2-Wheeler (Scooter)</option>
                <option>2-Wheeler (Motorcycle)</option>
                <option>Car / Sedan</option>
                <option>SUV / MUV</option>
                <option>Truck / LCV</option>
                <option>Bus / HCV</option>
                <option>Tractor / Agricultural</option>
                <option>3-Wheeler</option>
              </select>
              <select className="sel" onChange={(e) => setServiceFilter(e.target.value)}>
                <option value="">Service Type</option>
                <option>Tyre Replacement</option>
                <option>Wheel Alignment</option>
                <option>Wheel Balancing</option>
                <option>Puncture Repair</option>
                <option>Rotation</option>
                <option>Nitrogen Filling</option>
                <option>General Check</option>
                <option>other</option>
              </select>
            </div>
          </div>
          <div class="items-table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>WO Number</th>
                  <th>Vehicle</th>
                  <th>Reg No</th>
                  <th>Vehicle Type</th>
                  <th>Services</th>
                  <th>Tyres</th>
                  <th>Advisor</th>
                  <th>Status</th>
                  <th>Complete Order</th>
                  <th>Date</th>
                  <th>Bay</th>
                  <th>Bill</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((wo, index) => {
                    const allServices = [
                      ...(wo.services || []),
                      ...(wo.otherService?.description
                        ? [
                          {
                            name: wo.otherService.description,
                            price: wo.otherService.price,
                            gst: wo.otherService.gst,
                          },
                        ]
                        : []),
                    ];

                    return (
                      <tr key={wo._id}>
                        <td>{index + 1}</td>
                        <td>
                          <span className="wo-id-link"
                            onClick={() => {
                              setSelectedWO(wo);
                              setOpenWoDetails(true);
                            }}
                          >
                            {wo.woNumber}</span>
                        </td>
                        <td>{wo.vehicle?.brandModel}</td>
                        <td>{wo.vehicle?.registrationNo}</td>
                        <td>{wo.vehicle?.vehicleType}</td>
                        <td>
                          {allServices
                            .flatMap((s) =>
                              s.name?.includes(",") ? s.name.split(",") : [s.name],
                            )
                            .map((name, i, arr) => (
                              <span key={i}>
                                {name.trim()}
                                {i < arr.length - 1 && ", "}
                              </span>
                            ))}
                        </td>
                        <td>
                          {(wo.tyres || [])
                            .map((t) => `${t.position} - ${t.brand}`)
                            .join(", ")}
                        </td>
                        <td>{wo.advisor}</td>
                        <td>
                          <span
                            className={`wo-tag ${wo.status === "COMPLETED"
                              ? "t-ok"
                              : wo.status === "CREATED"
                                ? "t-pending"
                                : "t-partial"
                              }`}
                          >
                            {wo.status.replace("_", " ")}
                          </span>
                        </td>
                        <td>
                          <label className={`ios-switch-small ${wo.status === "COMPLETED" ? "disabled" : ""}`}>
                            <input
                              type="checkbox"
                              checked={wo.status === "COMPLETED" || wo.isActive}
                              disabled={wo.status === "COMPLETED"}
                              onChange={() => handleCompleteToggle(wo)}
                            />
                            <span className="slider" />
                          </label>
                        </td>
                        <td>
                          {new Date(wo.createdAt).toLocaleDateString("en-GB")}
                        </td>
                        <td>
                          {assigningBayId === wo._id ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <input
                                className="wo-inp"
                                style={{ width: "90px" }}
                                placeholder="Bay no.."
                                value={bayInput}
                                onChange={(e) => setBayInput(e.target.value)}
                              />
                              <span
                                style={{ cursor: "pointer", color: "green", fontSize: "18px" }}
                                onClick={() => handleAssignBay(wo.woNumber)}
                              >
                                <IoMdCheckmarkCircleOutline />
                              </span>
                              <span
                                style={{ cursor: "pointer", color: "red", fontSize: "18px" }}
                                onClick={() => {
                                  setAssigningBayId(null);
                                  setBayInput("");
                                }}
                              >
                                <MdOutlineCancel />
                              </span>
                            </div>

                          ) : (wo.bayStatus === "OCCUPIED" || wo.status === "COMPLETED") ? (
                            <div className="wo-bay-tag">
                              Assigned: {wo.bay}
                            </div>

                          ) : (
                            <button
                              className="btn btn-p btn-sm"
                              onClick={() => {
                                setAssigningBayId(wo._id);
                                setBayInput("");
                              }}
                            >
                              Assign Bay
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-g btn-sm"
                            onClick={()=>{
                              setSelectedWO(wo)
                              setOpenDiscount(true)}
                            }>
                            <MdOutlineRemoveRedEye /> View Bill
                          </button>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <MdEdit
                            color="green"
                            className="me-1"
                            size={18}
                            cursor="pointer"
                            onClick={() => {
                              setEditData(wo);
                              setOpenAddWorkerOrderModal(true);
                            }}
                          />
                          <MdDelete color="red" size={18} cursor={'pointer'}
                            onClick={() => {
                              setWoNumber(wo.woNumber);
                              setDeleteModal(true);
                            }} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11" className="items-empty">
                      No Work Orders Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {openAddWorkerOrderModal && (
            <AddWorkOrderModal
              closeModal={() => {
                setOpenAddWorkerOrderModal(false);
                setEditData(null);
              }}
              editData={editData}
              setWoData={setWoData}
            />
          )}
          {deleteModal && (
            <div className="delete-backdrop">
              <div className="delete-modal">
                <div className="delete-icon-wrap">
                  <MdDelete className="delete-icon" />
                </div>

                <h3 className="delete-title">Delete Item?</h3>

                <p className="delete-text">
                  Are you sure you want to delete this item? This action cannot be
                  undone.
                </p>

                <div className="delete-actions">
                  <button
                    className="delete-btn cancel"
                    onClick={() => {
                      setDeleteModal(false);
                      setWoNumber(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="delete-btn confirm"
                    onClick={handleDelete}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <span className="btn-loader"></span>
                    ) : (
                      <>
                        <MdDelete /> Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>)}
        {openDiscount && 
        <DiscountModal
  closeModal={setOpenDiscount}
  woData={selectedWO}
  setWoData={setWoData}
  onBillCreated={(data) => {
    setBillData(data?.bill);
    setOpenBillModal(true);
  }}
/>}
{openBillModal && (
  <BillModal
    closeModal={() => setOpenBillModal(false)}
    billData={billData}
  />
)}
    </>
  );
}
