import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BsCashStack, BsCreditCard } from "react-icons/bs";
import { IoIosPhonePortrait } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addPayment } from "../../../redux/POS/BillSlice";
import { supplierPayment } from "../../../redux/POS/SupplierSlice";

const paymentModes = [
  { label: "cash", icon: <BsCashStack size={20} /> },
  { label: "upi", icon: <IoIosPhonePortrait size={20} /> },
  { label: "card", icon: <BsCreditCard size={20} /> },
];

const SelectPaymentModal = ({
  closeModal,
  billId,
  onSuccess,
  purchaseId,
  totalAmount,
  dueAmount
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("FULL");
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [amounts, setAmounts] = useState({
    cash: "",
    upi: "",
    card: "",
  });


  const toggleMethod = (method) => {
    setSelectedMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handleAmountChange = (method, value) => {
    setAmounts((prev) => ({
      ...prev,
      [method]: value,
    }));
  };

  useEffect(() => {
    if (paymentType === "FULL") {
      setSelectedMethods(["cash"]);
      setAmounts({
        cash: "",
        upi: "",
        card: "",
      });
    }
  }, [paymentType, totalAmount]);

const totalPaid = selectedMethods.reduce(
  (sum, method) => sum + Number(amounts[method] || 0),
  0
);

const payable = dueAmount || totalAmount || 0;

const remaining = payable - totalPaid;



  const handleSubmit = async () => {
    const paymentList = selectedMethods
      .filter((m) => Number(amounts[m]) > 0)
      .map((m) => ({
        method: m,
        amount: Number(amounts[m]),
      }));

    if (paymentType !== "CREDIT" && paymentList.length === 0) {
      return toast.error("Enter payment amount");
    }

    try {
      setLoading(true);
      let response;
      if (purchaseId) {
        response = await dispatch(
          supplierPayment({
            purchaseId,
            payments: paymentList,
            type: paymentType,
          })
        ).unwrap();
      } else {
        response = await dispatch(
          addPayment({
            billId,
            payments: paymentList,
            type: paymentType,
          })
        ).unwrap();
      }
      toast.success(response.message);
      closeModal(false);
      onSuccess(response);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="po-m-overlay">
      <div className="po-m-box po-m-lg">
        <div className="po-m-header">
          <span>Complete Payment</span>
          <button className="po-m-close" onClick={() => closeModal(false)}>
            <IoClose size={20}/>
          </button>
        </div>
        <div className="po-m-pay-container">
          <div className="po-m-pay-t-label">Amount Payable</div>
          <div className="po-m-pay-t-amt">₹{totalAmount.toLocaleString("en-IN") || 0}</div>
          <div className="text-danger">Due Amount: ₹{dueAmount.toLocaleString("en-IN") || 0}</div>
        </div>
        <div className="po-m-pay-new-container">
          <div className="po-m-pay-left">
            <div className="po-m-pay-box">
              <h4>Payment Type</h4>
              <div className="po-m-pay-type-row">
                {["FULL", "PARTIAL", "CREDIT"].map((t) => (
                  <button
                    key={t}
                    className={`po-m-pay-type-btn ${
                      paymentType === t ? "active" : ""
                    }`}
                    onClick={() => setPaymentType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="po-m-pay-box">
              <h4>Payment Methods</h4>

              <div className="po-m-pay-method-grid">
                {paymentModes.map((p) => {
                  const isActive = selectedMethods.includes(p.label);

                  return (
                    <div key={p.label} className="po-m-pay-method-wrapper">
                      {/* Select Button */}
                      <div
                        className={`po-m-pay-method ${
                          isActive ? "active" : ""
                        }`}
                        onClick={() => toggleMethod(p.label)}
                      >
                        <div className="po-m-pay-icon">{p.icon}</div>
                        <div className="po-m-pay-label">
                          {p.label.toUpperCase()}
                        </div>
                      </div>
                      {isActive && (
<div className="po-m-pay-input-wrap">
  <span className="po-m-pay-input-label">{p.label.toUpperCase()}</span>

  <div className="po-m-pay-input-box">
    <span className="po-m-currency">₹</span>
    <input
      type="number"
      placeholder="0"
      value={amounts[p.label]}
      onChange={(e) =>
        handleAmountChange(p.label, e.target.value)
      }
      className="po-m-pay-input"
    />
  </div>
</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="po-m-pay-right">
           <div className="po-m-pay-summary-box">
  <h4>Summary</h4>

  {selectedMethods.map((m) =>
    amounts[m] ? (
      <div key={m} className="po-m-pay-row">
        <span>{m.toUpperCase()}</span>
        <span>₹{Number(amounts[m])}</span>
      </div>
    ) : null
  )}

  <div className="po-m-pay-row mb-2">
    <span>Due Amount</span>
    <span>₹{payable}</span>
  </div>

  <hr className="my-2" />

  <div className="po-m-pay-row">
    <span>Total Paid</span>
    <span>₹{totalPaid}</span>
  </div>

  <div className="po-m-pay-row">
    <span>Remaining</span>
    <span
      style={{
        color: remaining > 0 ? "#ef4444" : "#22c55e",
        fontWeight: 600,
      }}
    >
      ₹{remaining > 0 ? remaining : 0}
    </span>
  </div>
</div>
          </div>
        </div>

        {/* Footer */}
        <div className="po-m-footer">
          <div></div>
           <button
                className="po-m-pay-complete-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Complete Payment"}
              </button>
          <button className="po-m-btn" onClick={() => closeModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentModal;