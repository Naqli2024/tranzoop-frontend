import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { createBill } from "../../../redux/POS/BillSlice";
import { useDispatch } from "react-redux";
import InvoiceModal from "../Payments/InvoiceModal";
import BillModal from "../POS/BillModal";

const DiscountModal = ({ closeModal, woData, setWoData, onBillCreated }) => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleBillSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        billingType: "WORK_ORDER",
        customerId: woData?.customerId,
        workOrderId: woData?._id,
        discount: value || 0,
      };
      const res = await dispatch(createBill(payload)).unwrap();
      toast.success(res.message);
      onBillCreated?.(res);
      closeModal(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="discount-overlay">
      <div className="discount-box">
        <button className="discount-close" onClick={() => closeModal(false)}>
          <IoClose size={20} />
        </button>
        <h3 className="discount-title">Is there any discount for this bill?</h3>
        <input
          type="number"
          className="discount-input"
          placeholder="Enter discount"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <div className="d-flex flex-column align-items-center gap-3">
          <button className="discount-apply-btn" onClick={handleBillSubmit}>
            {loading ?'Loading..'  :'View Bill'}
          </button>
          <button className="discount-no-btn" onClick={() => closeModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
