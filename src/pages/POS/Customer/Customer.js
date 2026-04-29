import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import AddCustomerModal from "./AddCustomerModal";
import { useDispatch } from "react-redux";
import { getAllCustomers } from "../../../redux/POS/CustomerSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import CustomerDetails from "./CustomerDetails";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Customer = () => {
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState([]);
  const [search, setSearch] = useState("");
  const [openCustomerDetails, setOpenCustomerDetails] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState();

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

  return (
    <>
      {openCustomerDetails
        ? (<CustomerDetails backToList={() => setOpenCustomerDetails(false)} customerId={selectedCustomerId} setSelectedCustomerId={setSelectedCustomerId}/>)
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
                onClick={() => setOpenAddCustomerModal(true)}
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
                      <div className="customer-name">{c.fullName}</div>
                      <div className="customer-sub">{c.mobile}</div>
                      <div className="customer-sub">GST No: {c.gstNo || "-"}</div>
                      <div className="customer-actions mt-2">
                         <div className="customer-tags">
                        <span className="customer-tag">{c.type}</span>
                      </div>
                         <div className="customer-view-btn"
                      onClick={()=>{
                    setSelectedCustomerId(c._id)
                    setOpenCustomerDetails(true)
                  }}>
                        <MdOutlineRemoveRedEye size={16}/>View
                      </div>
                      </div>
                     
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{color:"var(--muted)"}}>No Customers found</div>
            )}
          </div>
          {openAddCustomerModal && (
            <AddCustomerModal
              closeModal={setOpenAddCustomerModal}
              setCustomerData={setCustomerData}
            />
          )}
        </div>)}
    </>
  );
};

export default Customer;
