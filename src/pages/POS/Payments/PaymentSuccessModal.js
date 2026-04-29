import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getBillByBusinessId, getBillByCustomerId } from "../../../redux/POS/BillSlice";
import { toast } from "react-toastify";
import { getAllPurchase } from "../../../redux/POS/PurchaseSlice";

const PaymentSuccessModal = ({
  closeModal,
  paymentRes,
  setPaymentData,
  setBills,
  customerId,
  setPurchaseData,
  purchaseId,
  setCustomerId,   
  setPurchaseId
}) => {
  const dispatch = useDispatch();

const handleSubmit = async () => {
  try {
    let res;
    if (customerId) {
      res = await dispatch(getBillByCustomerId(customerId)).unwrap();
    } else if (purchaseId) {
      res = await dispatch(getAllPurchase()).unwrap();
    } else {
      res = await dispatch(getBillByBusinessId()).unwrap();
    }
    setPaymentData?.(res.data || []);
    setBills?.(res.data?.bills || []);
    setPurchaseData(res?.purchases || []);
    setCustomerId?.(null);
    setPurchaseId?.(null);
  } catch (err) {
    toast.error(err);
  } finally {
    closeModal(false);  
  }
};

  return (
    <div className="pay-success-overlay">
      <div className="pay-success-box">
        <button className="pay-close" onClick={handleSubmit}>
          <IoClose size={20} />
        </button>

        {/* Icon */}
        <div className="pay-success-icon">
          <IoCheckmarkCircleOutline size={70} />
        </div>

        {/* Title */}
        <h2 className="pay-success-title">Payment Successful</h2>

        <p className="pay-success-msg">
          Payment has been recorded successfully
        </p>

        {/* Amount Summary */}
        <div className="pay-success-summary">
          <div className="pay-row">
            <span>Paid Amount</span>
            <b className="green">₹{purchaseId
           ? paymentRes.purchase.paidAmount.toLocaleString("en-IN") || 0
           : paymentRes.bill.paidAmount.toLocaleString("en-IN") || 0
          }</b>
          </div>
          <div className="pay-row">
            <span>Pending Amount</span>
            <b className="red">₹{purchaseId
            ? paymentRes.purchase.dueAmount.toLocaleString("en-IN")|| 0
            : paymentRes.bill.dueAmount.toLocaleString("en-IN")|| 0}</b>
          </div>
        </div>

        {/* Button */}
        <button className="pay-success-btn" onClick={handleSubmit}>
          Done
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
