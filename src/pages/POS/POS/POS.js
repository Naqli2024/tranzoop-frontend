import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import CarTyre from "../../../assets/images/car-tyre.png";
import { MdOutlineCancel } from "react-icons/md";
import AddItemsModal from "../Items/AddItemsModal";
import AddCustomerModal from "../Customer/AddCustomerModal";
import SelectCustomerModal from "../Customer/SelectCustomerModal";
import AddWorkOrderModal from "../WorkOrder/AddWorkOrderModal";
import {
  getAllItems,
  getItemImage,
  getSearchItems,
} from "../../../redux/POS/ItemSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { IoMdPerson } from "react-icons/io";
import { MdStop } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import BillModal from "./BillModal";
import { createBill, getBillById } from "../../../redux/POS/BillSlice";
import { GiCarWheel } from "react-icons/gi";
import SelectPaymentModal from "../Payments/SelectPaymentModal";
import PaymentSuccessModal from "../Payments/PaymentSuccessModal";

const payModes = [
  { l: "Cash", i: "💵" },
  { l: "UPI", i: "📱" },
  { l: "Card", i: "💳" },
  { l: "Wallet", i: "👜" },
  { l: "Points", i: "⭐" },
  { l: "Mixed", i: "⚡" },
];

const POS = () => {
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [openSelectCustomerModal, setOpenSelectCustomerModal] = useState(false);
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
  const [openAddWorkerOrderModal, setOpenAddWorkerOrderModal] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [discountType, setDiscountType] = useState("%");
  const [discountValue, setDiscountValue] = useState();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [billData, setBillData] = useState();
  const [billId, setBillId] = useState();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openPaymentSuccessModal, setOpenPaymentSuccessModal] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllItems())
      .unwrap()
      .then((response) => {
        setItemData(response.data || []);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice search not supported");
      return;
    }

    // 🔁 If already listening → STOP
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;

    recognitionRef.current = recognition;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript;
      setSearch(text);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice recognition error");
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const categories = [
    "All",
    ...new Set(itemData.map((i) => i.category)),
    "Favs",
  ];

  const filteredItems = itemData.filter((item) => {
    const matchSearch =
      item.itemName?.toLowerCase().includes(search.toLowerCase()) ||
      item.sku?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      selectedCategory === "Favs" ||
      item.category === selectedCategory;

    const matchFavCategory =
      selectedCategory !== "Favs" || item.isFavorite === true;

    return matchSearch && matchCategory && matchFavCategory;
  });

  const handleAddToCart = async (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === item._id);

      if (existing) {
        return prev.map((p) =>
          p._id === item._id ? { ...p, qty: p.qty + 1 } : p,
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });

    try {
      dispatch(getSearchItems(item.itemName));
    } catch (err) {
      console.error(err);
    }
  };

  const updateQty = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty + change } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.qty || 0) * (item.mrp || 0),
    0,
  );

  // Discount
  const discountAmount =
    discountType === "%"
      ? (subtotal * (discountValue || 0)) / 100
      : discountValue || 0;

  const taxableAmount = subtotal - discountAmount;

  const handleClearCart = () => {
    setCart([]);
    setDiscountValue(0);
  };

  const gstBreakup = cart.reduce(
    (acc, item) => {
      const qty = item.qty || 0;
      const price = item.mrp || 0;

      const itemTotal = qty * price;

      const itemDiscount =
        subtotal > 0 ? (itemTotal / subtotal) * discountAmount : 0;

      const taxable = itemTotal - itemDiscount;

      const gstRate = item.gst || 0;

      const gst = (taxable * gstRate) / 100;

      acc.totalGST += gst || 0;
      acc.cgst += gst / 2 || 0;
      acc.sgst += gst / 2 || 0;

      return acc;
    },
    { totalGST: 0, cgst: 0, sgst: 0 },
  );
  const gstAmount = gstBreakup.totalGST || 0;
  const cgst = gstBreakup.cgst || 0;
  const sgst = gstBreakup.sgst || 0;

  const total = (taxableAmount || 0) + gstAmount;

  const handleBillSubmit = async () => {
    try {
      if (cart.length === 0) {
        toast.error("Cart is empty");
        return;
      }
      if (!selectedCustomer) {
        toast.error("Select customer");
        return;
      }
      setLoading(true);
      const payload = {
        customerId: selectedCustomer._id,
        items: cart.map((item) => ({
          itemId: item._id,
          quantity: item.qty,
        })),
        discount: discountAmount,
        paymentMethod: selectedPayment?.toLowerCase(),
      };
      const res = await dispatch(createBill(payload)).unwrap();
      toast.success(res.message);
      setBillId(res?.bill?._id);
      setOpenPaymentModal(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="pos-m-container">
      {loading && <Loader isLoading={loading} />}
      <div class="pos-m-container">
        <div class="pos-m-left" onClick={() => setShowCart(false)}>
          <div class="pos-m-scan-bar">
            <div className="pos-m-scan-input-wrap">
              <IoSearchOutline className="pos-m-search-icon" />
              <input
                className="pos-m-scan-inp"
                placeholder="Scan barcode / type item name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search.length > 0 && (
                <MdClear
                  className="pos-m-clear-icon"
                  onClick={() => setSearch("")}
                />
              )}
              {isListening ? (
                <MdStop
                  className="pos-m-stop-icon recording"
                  size={20}
                  onClick={() => setIsListening(false)}
                />
              ) : (
                <MdOutlineKeyboardVoice
                  className="pos-m-voice-icon"
                  size={20}
                  onClick={handleVoiceSearch}
                />
              )}
            </div>
            <button
              class="pos-m-btn-sm btn-p"
              onClick={() => setOpenAddItemModal(true)}
            >
              <IoAdd size={15} /> Add Item
            </button>
            <button
              class="pos-m-btn-sm btn-b"
              onClick={() => setOpenAddWorkerOrderModal(true)}
            >
              <IoAdd size={15} /> Work Order
            </button>
          </div>
          <div className="pos-m-cat-row">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`pos-m-cat-filter ${selectedCategory === cat ? "active" : ""
                  }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
          <div class="pos-m-prod-grid">
            {itemData.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  className="pos-m-prod-card"
                  onClick={() => handleAddToCart(item)}
                >
                  <div className="pos-m-prod-card-image">
                    <img
                      src={`https://tranzoop.com${item.itemImage}`}
                      alt={item?.itemName}
                    />
                  </div>
                  <div className="pos-m-prod-card-name">
                    {item?.itemName?.length > 20
                      ? item.itemName.slice(0, 20) + "..."
                      : item?.itemName}
                  </div>
                  <div className="pos-m-prod-card-code">{item.sku}</div>
                  <div className="pos-m-prod-card-price">₹{item.mrp}</div>
                  <div className="pos-m-prod-card-stock">
                    {item.openingStock} NOs
                  </div>
                </div>
              ))
            ) : (
              <div className="no-items-found">
                <div className="d-flex flex-column align-items-center gap-2">
                  <GiCarWheel size={50} color="var(--accent2)" />
                  No Items Found
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          className="pos-cart-toggle"
          onClick={() => setShowCart(true)}
        >
          🛒
        </button>
        <div class={`pos-m-right ${showCart ? "show" : ""}`}>
          <button
            className="pos-cart-close"
            onClick={() => setShowCart(false)}
          >
            ✕
          </button>
          <div class="pos-m-cart-top">
            <div class="pos-m-cart-av">
              {selectedCustomer?.fullName
                ?.split(" ")
                .slice(0, 2)
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </div>
            <div style={{ flex: "1" }}>
              <div className="pos-m-cart-cname">
                {selectedCustomer?.fullName || "Select Customer"}
              </div>
              <div className="pos-m-cart-inv-no">
                {selectedCustomer?.mobile || "—"}
              </div>
            </div>
            <div
              className="pos-m-change-text"
              onClick={() => setOpenSelectCustomerModal(true)}
            >
              {selectedCustomer === null ? "Select ›" : "Change ›"}
            </div>
          </div>
          <div className="pos-m-cart-body">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div className="pos-m-ci" key={item._id}>
                  <div className="pos-m-ci-info">
                    <div className="pos-m-ci-name">{item.itemName}</div>
                    <div className="pos-m-ci-meta">
                      ₹{item.mrp} · {item.uom} · {item.gst}% GST
                    </div>
                  </div>

                  <div className="pos-m-ci-right">
                    <div className="pos-m-qty-ctrl">
                      <button
                        className="pos-m-qb"
                        onClick={() => updateQty(item._id, -1)}
                      >
                        −
                      </button>
                      <span className="pos-m-qn">{item.qty}</span>
                      <button
                        className="pos-m-qb"
                        onClick={() => updateQty(item._id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="pos-m-ci-total">₹{item.qty * item.mrp}</div>
                  </div>
                  <button
                    className="pos-m-del-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    <MdOutlineCancel />
                  </button>
                </div>
              ))
            ) : (
              <div className="pos-m-cart-empty">
                <div style={{ fontSize: "36px" }}>🛒</div>
                <div>Cart is empty</div>
                <div style={{ fontSize: "10px", textAlign: "center" }}>
                  Scan or tap a product to add
                </div>
              </div>
            )}
          </div>
          <div className="pos-m-bill-sum">
            <div className="pos-m-disc-box">
              <div className="pos-m-disc-row">
                <span className="pos-m-discount-text">Discount</span>

                <div className="pos-m-disc-toggle">
                  <button
                    className={`pos-m-dt-btn ${discountType === "%" ? "act" : ""}`}
                    onClick={() => setDiscountType("%")}
                  >
                    %
                  </button>

                  <button
                    className={`pos-m-dt-btn ${discountType === "₹" ? "act" : ""}`}
                    onClick={() => setDiscountType("₹")}
                  >
                    ₹
                  </button>
                </div>

                <input
                  type="number"
                  className="pos-m-discount-inp"
                  min="0"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="pos-m-sr">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="pos-m-sr pos-m-disc-r">
                <span>Discount</span>
                <span>−₹{discountAmount}</span>
              </div>
            )}
            <div className="pos-m-sr">
              <span>CGST + SGST</span>
              <span>₹{gstAmount}</span>
            </div>
            <div className="pos-m-sr pos-m-grand">
              <span>TOTAL</span>
              <span>₹{total}</span>
            </div>
            {/* <div className="pos-m-pay-grid">
              {payModes.map((payment, i) => (
                <div
                  key={i}
                  className={`pos-m-pb2 ${selectedPayment === payment.l ? "active" : ""}`}
                  onClick={() => setSelectedPayment(payment.l)}
                >
                  <span className="pos-m-pb2-i">{payment.i}</span>
                  {payment.l}
                </div>
              ))}
            </div> */}
            <button
              className="pos-m-charge-btn"
              disabled={cart.length === 0}
              onClick={handleBillSubmit}
            >
              Charge ₹{total}
            </button>
            <div className="pos-m-cart-qa mt-2">
              <button className="pos-m-cqa" onClick={handleClearCart}>
                🗑 Clear
              </button>
            </div>
          </div>
        </div>

        {openAddItemModal && <AddItemsModal closeModal={setOpenAddItemModal} setItemData={setItemData}/>}
        {openSelectCustomerModal && (
          <SelectCustomerModal
            closeModal={setOpenSelectCustomerModal}
            openAddModal={setOpenAddCustomerModal}
            onSelectCustomer={(customer) => {
              setSelectedCustomer(customer);
              setOpenSelectCustomerModal(false);
            }}
          />
        )}
        {openAddCustomerModal && (
          <AddCustomerModal closeModal={setOpenAddCustomerModal} />
        )}
        {openAddWorkerOrderModal && (
          <AddWorkOrderModal
            closeModal={() => setOpenAddWorkerOrderModal(false)}
          />
        )}
        {openBillModal && (
          <BillModal
            closeModal={() => setOpenBillModal(false)}
            billData={billData}
          />
        )}
      </div>
      {openPaymentModal && (
        <SelectPaymentModal
          closeModal={setOpenPaymentModal}
          billId={billId}
          onSuccess={(res) => {
            setPaymentResponse(res);
            setOpenPaymentSuccessModal(true);
          }}
          totalAmount={total}
        />
      )}
      {openPaymentSuccessModal && (
        <PaymentSuccessModal
          closeModal={setOpenPaymentSuccessModal}
          paymentRes={paymentResponse}
        />
      )}
    </div>
  );
};

export default POS;
