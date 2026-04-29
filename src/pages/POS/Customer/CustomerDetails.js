import React, { useEffect, useState } from "react";
import { getBillByCustomerId } from "../../../redux/POS/BillSlice";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BillModal from "../POS/BillModal";
import { IoPrintOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import SelectPaymentModal from "../Payments/SelectPaymentModal";
import PaymentSuccessModal from "../Payments/PaymentSuccessModal";

const CustomerDetails = ({ backToList, customerId,setSelectedCustomerId }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({ paid: 0, partial: 0, notPaid: 0 });
  const [filters, setFilters] = useState({
    status: "ALL",
    range: "ALL",
    date: "",
  });
  const [selectedBill, setSelectedBill] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);
  const dispatch = useDispatch();
  const [paymentResponse, setPaymentResponse] = useState();
  const [openPaymentSuccessModal, setOpenPaymentSuccessModal] = useState(false);

  useEffect(() => {
    if (!customerId) return;
    setLoading(true);
    dispatch(getBillByCustomerId(customerId))
      .unwrap()
      .then((res) => {
        const billList = res?.data?.bills || [];
        setBills(billList);
        const paid = billList.filter((b) => b.paymentStatus === "PAID").length;
        const partial = billList.filter(
          (b) => b.paymentStatus === "PARTIAL",
        ).length;
        const notPaid = billList.filter(
          (b) => b.paymentStatus === "NOT_PAID",
        ).length;

        setSummary({ paid, partial, notPaid });
      })
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  }, [dispatch, customerId]);

  const filteredBills = Array.isArray(bills)
    ? bills.filter((bill) => {
        const statusMatch =
          filters.status === "ALL" || bill.paymentStatus === filters.status;

        const billDate = new Date(bill.createdAt);
        const today = new Date();

        let rangeMatch = true;

        if (filters.range === "TODAY") {
          rangeMatch = billDate.toDateString() === today.toDateString();
        }

        if (filters.range === "WEEK") {
          const firstDay = new Date(today);
          firstDay.setDate(today.getDate() - today.getDay());

          const lastDay = new Date(firstDay);
          lastDay.setDate(firstDay.getDate() + 6);

          rangeMatch = billDate >= firstDay && billDate <= lastDay;
        }

        if (filters.range === "YEAR") {
          rangeMatch = billDate.getFullYear() === today.getFullYear();
        }

        const customDateMatch = filters.date
          ? billDate.toDateString() === new Date(filters.date).toDateString()
          : true;

        return statusMatch && rangeMatch && customDateMatch;
      })
    : [];

  return (
    <div className="customer-details-container">
      {loading && <Loader isLoading={loading} />}
      <div className="customer-top-bar">
        <button className="btn btn-p" onClick={backToList}>
          ← Back
        </button>
        <div className="customer-details-filters">
          <select
            className="sel"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="ALL">All</option>
            <option value="PAID">Paid</option>
            <option value="PARTIAL">Partial</option>
            <option value="NOT_PAID">Not Paid</option>
          </select>

          <select
            className="sel"
            value={filters.range}
            onChange={(e) =>
              setFilters({ ...filters, range: e.target.value, date: "" })
            }
          >
            <option value="ALL">All Time</option>
            <option value="TODAY">Today</option>
            <option value="WEEK">This Week</option>
            <option value="YEAR">This Year</option>
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value, range: "ALL" })
            }
          />
        </div>

        <div className="customer-details-summary">
          <span className="paid">Paid: {summary.paid}</span>
          <span className="partial">Partial: {summary.partial}</span>
          <span className="notpaid">Not Paid: {summary.notPaid}</span>
        </div>
      </div>
      {bills?.length > 0 && (
        <div className="customer-details-card">
          <h3>{bills[0]?.customerName}</h3>
          <p>Total Bills: {bills?.length || 0}</p>
        </div>
      )}
      <div className="customer-details-bill-list">
        {filteredBills?.length > 0 ? (
          filteredBills?.map((bill, index) => (
            <div key={bill._id} className="customer-details-bill-card">
              <div className="bill-card-body">
                <div className="customer-details-bill-header">
                  <h4>Bill No: {bill.billNo || `${index + 1}`}</h4>
                  <div>
                    <span
                      className={`customer-details-status ${bill.paymentStatus.toLowerCase()}`}
                    >
                      {bill.paymentStatus.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <p className="customer-details-bill-date">
                  {new Date(bill.createdAt).toLocaleString("en-GB")}
                </p>
                <table className="customer-details-bill-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>GST</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(bill.items || []).map((item, i) => (
                      <tr key={i}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price}</td>
                        <td>{item.gst}%</td>
                        <td>₹{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="customer-details-bill-summary">
                  <p className="wo-value">
                    <span className="wo-label">Sub Total:</span> ₹
                    {bill.subTotal}
                  </p>
                  <p className="wo-value">
                    <span className="wo-label">GST:</span> ₹{bill.gstTotal}
                  </p>
                  <p className="wo-value">
                    <span className="wo-label">Discount:</span> ₹{bill.discount}
                  </p>
                  <p className="wo-value">
                    <span className="wo-label">Grand Total:</span> ₹
                    {bill.grandTotal}
                  </p>
                  <p className="wo-value">
                    <span className="wo-label">Paid:</span> ₹{bill.paidAmount}
                  </p>
                  <p className="wo-value due">
                    <span className="wo-label due">Due:</span> ₹{bill.dueAmount}
                  </p>
                </div>
              </div>
              <div className="customer-details-bill-footer">
                <button
                  className="btn btn-p btn-sm me-3"
                  onClick={() => {
                    setSelectedBill(bill);
                    setOpenModal(true);
                  }}
                >
                  <IoPrintOutline />
                  Print
                </button>
                {bill.dueAmount > 0 ? (
                  <button
                    className="btn btn-g btn-sm"
                    onClick={() => {
                      setSelectedBill(bill);
                      setOpenPayModal(true);
                    }}
                  >
                    <MdOutlinePayments /> Pay Due Amount
                  </button>
                ) : (
                  <span className="paid-label">
                    <IoIosCheckmarkCircleOutline size={20} className="me-1" />
                    Fully Paid
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-items-found">No bills found</div>
        )}
      </div>
      {openModal && (
        <BillModal
          billData={selectedBill}
          closeModal={() => setOpenModal(false)}
        />
      )}

      {openPayModal && (
        <SelectPaymentModal
          closeModal={setOpenPayModal}
          billId={selectedBill?._id}
          onSuccess={(res) => {
            setPaymentResponse(res);
            setOpenPaymentSuccessModal(true);
          }}
          totalAmount={selectedBill?.grandTotal}
          dueAmount={selectedBill?.dueAmount}
        />
      )}
      {openPaymentSuccessModal && (
        <PaymentSuccessModal
          closeModal={setOpenPaymentSuccessModal}
          paymentRes={paymentResponse}
          setBills={setBills}
          customerId={customerId}
          setCustomerId={setSelectedCustomerId}
        />
      )}
    </div>
  );
};

export default CustomerDetails;
