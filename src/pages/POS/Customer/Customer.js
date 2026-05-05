import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import AddCustomerModal from "./AddCustomerModal";
import { useDispatch } from "react-redux";
import { deleteCustomer, getAllCustomers } from "../../../redux/POS/CustomerSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import CustomerDetails from "./CustomerDetails";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Customer = () => {
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState([]);
  const [search, setSearch] = useState("");
  const [openCustomerDetails, setOpenCustomerDetails] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState();
  const [editData, setEditData] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const COLORS = ["#FF6B35", "#00C4FF", "#22C55E", "#F59E0B"];

  const filteredCustomers = customerData.filter((c) => {
    const query = search.toLowerCase();

    return (
      c.fullName?.toLowerCase().includes(query) ||
      c.mobile?.toLowerCase().includes(query) ||
      c.type?.toLowerCase().includes(query)
    );
  });

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const res = await dispatch(deleteCustomer(deleteCustomerId)).unwrap();

      toast.success(res.message);
      const response = await dispatch(getAllCustomers()).unwrap();
      setCustomerData(response.data || []);

      setDeleteModal(false);
      setDeleteCustomerId(null);
    } catch (err) {
      toast.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      {openCustomerDetails
        ? (<CustomerDetails backToList={() => setOpenCustomerDetails(false)} customerId={selectedCustomerId} setSelectedCustomerId={setSelectedCustomerId} />)
        : (<div className="customer-container">
          {loading && <Loader isLoading={loading} />}
          <div className="wo-ph">
            <span className="wo-ph-title">👥 Customer Master</span>
            <div className="wo-ph-actions">
              <input
                className="items-inp"
                style={{ width: "220px" }}
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                class="btn btn-p btn-sm"
                onClick={() => {
                  setEditData(null)
                  setOpenAddCustomerModal(true)
                }}
              >
                <IoAdd size={15} /> Add Customer
              </button>
            </div>
          </div>
          <div className="customer-card-grid">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c, i) => {
                const color = COLORS[i % COLORS.length];
                return (
                  <div className="customer-card">
                    <div
                      className="po-m-modal-avatar"
                      style={{ "--avatar-color": color }}
                    >
                      {c.fullName
                        ?.split(" ")
                        .slice(0, 2)
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div className="customer-info">
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="customer-name">{c.fullName}</div>
                          <div className="customer-sub">{c.mobile}</div>
                          <div className="customer-sub">GST No: {c.gstNo || "-"}</div>
                        </div>
                        <div>
                          <div className="customer-info-icon">
                            <MdEdit
                              color="green"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setEditData(c);
                                setOpenAddCustomerModal(true);
                              }}
                            />
                          </div>
                          <div className="customer-info-icon">
                            <MdDelete
                              color="red"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setDeleteCustomerId(c._id);
                                setDeleteModal(true);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="customer-actions mt-2">
                        <div className="customer-tags">
                          <span className="customer-tag">{c.type}</span>
                        </div>
                        <div className="customer-view-btn"
                          onClick={() => {
                            setSelectedCustomerId(c._id)
                            setOpenCustomerDetails(true)
                          }}>
                          <MdOutlineRemoveRedEye size={16} />View
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: "var(--muted)" }}>No Customers found</div>
            )}
          </div>
          {openAddCustomerModal && (
            <AddCustomerModal
              closeModal={setOpenAddCustomerModal}
              setCustomerData={setCustomerData}
              editData={editData}
              setEditData={setEditData}
            />
          )}
        </div>)}
      {deleteModal && (
        <div className="delete-backdrop">
          <div className="delete-modal">
            <div className="delete-icon-wrap">
              <MdDelete className="delete-icon" />
            </div>
            <h3 className="delete-title">Delete Item?</h3>
            <p className="delete-text">
              Are you sure you want to delete this customer? This action cannot be
              undone.
            </p>
            <div className="delete-actions">
              <button
                className="delete-btn cancel"
                onClick={() => {
                  setDeleteModal(false);
                  setDeleteCustomerId(null);
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
    </>
  );
};

export default Customer;
