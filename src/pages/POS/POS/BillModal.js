import React, { useEffect, useState } from "react";
import { FaPrint, FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { getUserById } from "../../../redux/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader";

const BillModal = ({ closeModal, billData, mobileNo }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getUserById())
      .unwrap()
      .then((res) => setUserData(res || {}))
      .catch((err) => toast.error(err))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleWhatsAppShare = () => {
  const itemsText =
    billData?.items
      ?.map(
        (item) =>
          `${item.itemName} - ${item.quantity} x ₹${item.price} = ₹${item.total}`
      )
      .join("\n") || "";

  const message = `
*${userData?.business?.shopName || "Tyre Shop"}*
${userData?.business?.address || ""}
GST: ${userData?.business?.gstNo || "N/A"}

Bill No: ${billData?.billNo}

------------------------
${itemsText}
------------------------
Subtotal: ₹${billData?.subTotal}
Discount: ₹${billData?.discount || 0}
GST: ₹${billData?.gstTotal}
Due: ₹${billData?.dueAmount}
TOTAL: ₹${billData?.grandTotal}

Thank you ${billData?.customerName || "Customer"}!
`;
  if (!mobileNo) {
    toast.error("Customer phone number missing");
    return;
  }

  const url = `https://wa.me/${mobileNo}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};

  return (
    <div className="bill-overlay">
      {loading && <Loader isLoading={loading} />}
      <div className="bill-modal">
        <div className="bill-header">
          <h2>{userData?.business?.shopName || "Tyre Shop"}</h2>
          <p>
            {userData?.business?.address || "N/A"} · GST:{userData?.business?.gstNo || "N/A"}
          </p>
          <span className="bill-no">
            {billData?.billNo}
          </span>
        </div>

        <div className="bill-divider" />
        <div className="bill-table-container">
          <table width="100%">
            <tbody>
              {billData?.items?.map((item, i) => (
                <tr key={i}>
                  <td style={{ width: "40%", wordBreak: "break-word" }}>
                    {item.itemName}
                  </td>
                  <td style={{ textAlign: "right", width: "25%" }}>
                    ₹{item.price} × {item.quantity}
                  </td>
                  <td style={{ textAlign: "right", width: "25%" }}>
                    ₹{item.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bill-tax">
          <span>CGST + SGST</span>
          <span>₹{billData?.gstTotal}</span>
        </div>
        <div className="bill-divider bold" />
        <div className="bill-summary">
          <span>Subtotal</span>
          <span>₹{billData?.subTotal}</span>
        </div>

        {billData?.discount > 0 && (
          <div className="bill-summary">
            <span>Discount</span>
            <span>−₹{billData?.discount}</span>
          </div>
        )}
        <div className="bill-summary">
            <span>Due Amount</span>
            <span>₹{billData?.dueAmount}</span>
          </div>
        <div className="bill-total">
          <span>TOTAL</span>
          <span>₹{billData?.grandTotal}</span>
        </div>

        <div className="bill-footer">
          <p>Thank you, {billData?.customerName || "Customer"}!</p>
          <small>Powered by Tranzoop</small>
        </div>

        {/* Actions */}
        <div className="bill-actions">
          <button className="bill-btn print">
            <FaPrint /> Print
          </button>

          <button className="bill-btn whatsapp" onClick={handleWhatsAppShare}>
            <FaWhatsapp /> WhatsApp
          </button>

          <button className="bill-btn new" onClick={closeModal}>
            <IoClose /> New
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
