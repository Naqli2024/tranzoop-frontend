import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../../../redux/POS/CustomerSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const SelectCustomerModal = ({
  closeModal,
  openAddModal,
  onSelectCustomer,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState([]);
  const [search, setSearch] = useState("");

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
    <div className="po-m-overlay">
      {loading && <Loader isLoading={loading} />}
      <div className="po-m-box po-m-sm">
        <div className="po-m-header">
          <span>Select Customer</span>
          <button className="po-m-close" onClick={() => closeModal(false)}>
            ✕
          </button>
        </div>
        <input
          className="items-inp"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="po-m-list">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((c, i) => {
              const color = COLORS[i % COLORS.length];
              return (
                <div
                  key={i}
                  className="po-m-modal-item"
                  onClick={() => onSelectCustomer(c)}
                >
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

                  <div className="po-m-modal-info">
                    <div className="po-m-modal-name">{c.fullName}</div>
                    <div className="po-m-modal-phone">{c.phone}</div>
                  </div>
                  <span className="po-m-modal-tag">{c.type}</span>
                </div>
              );
            })
          ) : (
            <div style={{color:"var(--muted)"}}>No Customers found</div>
          )}
        </div>

        <div className="po-m-footer po-m-full">
          <button
            className="po-m-btn po-m-primary"
            onClick={() => {
              closeModal(false);
              openAddModal(true);
            }}
          >
            + Add New Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCustomerModal;
