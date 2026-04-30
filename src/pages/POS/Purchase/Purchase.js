import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import NewPurchase from "./NewPurchase";
import { getAllPurchase } from "../../../redux/POS/PurchaseSlice";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import SelectPaymentModal from "../Payments/SelectPaymentModal";
import PaymentSuccessModal from "../Payments/PaymentSuccessModal";
import { LuCircleCheckBig } from "react-icons/lu";

const Purchase = () => {
  const [openNewPurchase, setOpenNewPurchase] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [purchaseData, setPurchaseData] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState();
  const [openPaymentSuccessModal, setOpenPaymentSuccessModal] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "ALL",
    paymentStatus: "ALL",
  });

  useEffect(() => {
    setLoading(true);
    dispatch(getAllPurchase())
      .unwrap()
      .then((response) => {
        setPurchaseData(response?.purchases || []);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const isInRange = (date, range) => {
    const d = new Date(date);
    const today = new Date();

    if (range === "TODAY") {
      return d.toDateString() === today.toDateString();
    }

    if (range === "WEEK") {
      const firstDay = new Date(today);
      firstDay.setDate(today.getDate() - today.getDay());

      const lastDay = new Date(firstDay);
      lastDay.setDate(firstDay.getDate() + 6);

      return d >= firstDay && d <= lastDay;
    }

    if (range === "MONTH") {
      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    }

    if (range === "YEAR") {
      return d.getFullYear() === today.getFullYear();
    }

    return true;
  };

  const filteredData = purchaseData.filter((p) => {
    const searchMatch =
      p.supplierName?.toLowerCase().includes(search.toLowerCase()) ||
      p.purchaseNo?.toLowerCase().includes(search.toLowerCase());

    const dateMatch = isInRange(p.purchaseDate, filters.dateRange);

    const paymentMatch =
      filters.paymentStatus === "ALL" ||
      p.paymentStatus === filters.paymentStatus;

    return searchMatch && dateMatch && paymentMatch;
  });

  return (
    <div className="purchase-container">
      {openNewPurchase ? (
        <NewPurchase
          backToList={() => {
            setOpenNewPurchase(false);
            setIsViewMode(false);
          }}
          setPurchaseData={setPurchaseData}
          viewData={selectedPurchase}
          isViewMode={isViewMode}
        />
      ) : (
        <div className="purchase-container">
          {loading && <Loader isLoading={loading} />}
          <div className="wo-ph">
            <span className="wo-ph-title">🏷️ Purchase</span>
            <div className="wo-ph-actions">
              <button class="btn btn-b btn-sm">Export</button>
              <button class="btn btn-p btn-sm" onClick={() => {
                setSelectedPurchase(null)
                setOpenNewPurchase(true)
              }}>
                <IoAdd size={15} /> New Purchase
              </button>
            </div>
          </div>
          <div class="items-filter-bar">
            <input
              class="items-inp"
              style={{ flex: "1", maxWidth: "300px" }}
              placeholder="Search by purchase no,supplier name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="d-flex gap-2">
              <select
                className="sel"
                value={filters.dateRange}
                onChange={(e) =>
                  setFilters({ ...filters, dateRange: e.target.value })
                }
              >
                <option value="ALL">All</option>
                <option value="TODAY">Today</option>
                <option value="WEEK">This Week</option>
                <option value="MONTH">This Month</option>
                <option value="YEAR">This Year</option>
              </select>
              <select
                className="sel"
                value={filters.paymentStatus}
                onChange={(e) =>
                  setFilters({ ...filters, paymentStatus: e.target.value })
                }
              >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="PARTIAL">Partial</option>
                <option value="PAID">Paid</option>
              </select>
            </div>
          </div>
          <div class="items-table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Purchase No</th>
                  <th>Tyre Brand & Model</th>
                  <th>Supplier Name</th>
                  <th>Supplier Invoice No</th>
                  <th>Purchase Date</th>
                  <th>Due Date</th>
                  <th>GST Total</th>
                  <th>Due Amount</th>
                  <th>Grand Total</th>
                  <th>Payment Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((p, index) => (
                    <tr key={p._id}>
                      <td>{index + 1}</td>
                      <td>{p.purchaseNo}</td>
                      <td>
                        {p.items.map((item, i) => (
                          <span key={i} style={{ fontSize: "12px" }}>
                            {item.itemName}
                            {i !== p.items.length - 1 && ", "}
                          </span>
                        ))}
                      </td>
                      <td>{p.supplierName}</td>
                      <td>{p.supplierInvoiceNo}</td>
                      <td>
                        {new Date(p.purchaseDate).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        {new Date(p.dueDate).toLocaleDateString("en-GB")}
                      </td>
                      <td>₹{p.gstTotal.toLocaleString("en-IN")}</td>
                      <td className="text-danger">₹{p.dueAmount.toLocaleString("en-IN")}</td>
                      <td>₹{p.grandTotal.toLocaleString("en-IN")}</td>
                      <td>
                        <span
                          className={`wo-tag ${p.paymentStatus === "PAID"
                            ? "t-ok"
                            : p.paymentStatus === "PARTIAL"
                              ? "t-partial"
                              : "t-pending"
                            }`}
                        >
                          {p.paymentStatus}
                        </span>
                      </td>
                      <td>₹{p.grandTotal.toLocaleString("en-IN")}</td>
                      <td>
                        <button
                          className="btn btn-p btn-sm me-3"
                          onClick={() => {
                            setSelectedPurchase(p);
                            setIsViewMode(true);
                            setOpenNewPurchase(true);
                          }}
                        >
                          <MdOutlineRemoveRedEye /> View
                        </button>
                        {p.dueAmount!==0
                        ? <button
                          className="btn btn-b btn-sm"
                          onClick={() => {
                            setSelectedPurchase(p);
                            setOpenPayModal(true);
                          }}>
                          <MdOutlinePayments /> Pay
                        </button>
                        : <span className="wo-tag t-ok" style={{ verticalAlign: "middle" }}>
                          <LuCircleCheckBig size={12} className="me-1"/> {p.paymentStatus}
                        </span>}
                      </td>
                    </tr>)
                  )
                ) : (
                  <tr>
                    <td colSpan="14" className="items-empty">
                      No purchases found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> 
        </div>
      )}
      {openPayModal &&
        <SelectPaymentModal 
        closeModal={setOpenPayModal} 
        purchaseId={selectedPurchase?._id}
        onSuccess={(res) => {
            setPaymentResponse(res);
            setOpenPaymentSuccessModal(true);
        }}
        totalAmount={selectedPurchase?.grandTotal}
        dueAmount={selectedPurchase?.dueAmount}
        />}
      {openPaymentSuccessModal && (
        <PaymentSuccessModal
          closeModal={setOpenPaymentSuccessModal}
          paymentRes={paymentResponse}
          setPurchaseData={setPurchaseData}
          purchaseId={selectedPurchase?._id}
          setPurchaseId={setSelectedPurchase}
        />
      )}  
    </div>
  );
};

export default Purchase;
