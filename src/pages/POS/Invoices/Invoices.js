import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBillByBusinessId } from "../../../redux/POS/BillSlice";
import SelectPaymentModal from "../../POS/Payments/SelectPaymentModal";
import BillModal from "../POS/BillModal";
import { getCustomerById } from "../../../redux/POS/CustomerSlice";
import Invoice from "../Payments/InvoiceModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import PaymentSuccessModal from "../../POS/Payments/PaymentSuccessModal";
import Loader from "../../../components/Loader";
import InvoiceModal from "../Payments/InvoiceModal";

const Invoices = () => {
  const [search, setSearch] = useState("");
  const [paymentData, setPaymentData] = useState([]);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [openBillModal, setOpenBillModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [customerMap, setCustomerMap] = useState({});
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getBillByBusinessId())
      .unwrap()
      .then((response) => {
        setPaymentData(response.data || []);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (paymentData.length === 0) return;

    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          paymentData.map((item) =>
            dispatch(getCustomerById(item.customerId)).unwrap(),
          ),
        );

        const map = {};
        results.forEach((res) => {
          const c = res.data;
          map[c._id] = c;
        });

        setCustomerMap(map);
        setLoading(false);
      } catch (err) {
        toast.error(err);
      }
    };

    fetchCustomers();
  }, [paymentData, dispatch]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filteredData = paymentData.filter((item) => {
    const query = search.toLowerCase();

    const matchesSearch =
      item.customerName?.toLowerCase().includes(query) ||
      customerMap[item.customerId]?.mobile?.includes(query);

    const matchesStatus = !statusFilter || item.paymentStatus === statusFilter;

    const matchesDate = (() => {
      if (!dateFilter) return true;
      const created = new Date(item.createdAt);
      const now = new Date();
      if (dateFilter === "Today") {
        return created.toDateString() === now.toDateString();
      }
      if (dateFilter === "This Week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return created >= weekAgo;
      }
      if (dateFilter === "This Month") {
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      }
      if (dateFilter === "This Year") {
        return created.getFullYear() === now.getFullYear();
      }
      return true;
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleExport = () => {
    const exportData = filteredData.map((item, index) => ({
      "S.No": index + 1,
      "Customer Name": item.customerName,
      Mobile: customerMap[item.customerId]?.mobile || "",
      Address: customerMap[item.customerId]?.address || "",
      Type: customerMap[item.customerId]?.type || "",
      Date: formatDate(item.createdAt),
      Total: item.grandTotal,
      Status: item.paymentStatus.replace("_", " "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "Payments.xlsx");
  };

  return (
    <div className="purchase-container">
      {loading && <Loader isLoading={loading} />}
      <div className="wo-ph">
        <span className="wo-ph-title">💸 Invoices</span>
        <div className="wo-ph-actions">
          <button class="btn btn-b btn-sm" onClick={handleExport}>
            Export
          </button>
        </div>
      </div>
      <div class="items-filter-bar">
        <input
          class="items-inp"
          style={{ flex: "1", maxWidth: "300px" }}
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="d-flex gap-2">
          <select
            className="sel"
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>

          <select
            className="sel"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="NOT_PAID">Pending</option>
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
              <th>Customer Name</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Type</th>
              <th>Generated Date</th>
              <th>Due Amount</th>
              <th>Grand Total</th>
              <th>Payment Status</th>
              <th>Invoice</th>
              <th>Bill</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.customerName}</td>
                  <td>{customerMap[item.customerId]?.mobile || "—"}</td>
                  <td>{customerMap[item.customerId]?.address || "—"}</td>
                  <td>
                    <span className="customer-tags customer-tag">
                      {customerMap[item.customerId]?.type || "—"}
                    </span>
                  </td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td className="text-danger">
                    ₹{item.dueAmount.toLocaleString("en-IN")}
                  </td>
                  <td>₹{item.grandTotal.toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`pay-tag ${item.paymentStatus}`}>
                      {item.paymentStatus.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-g"
                      onClick={() => {
                        setSelectedBill(item);
                        setOpenInvoiceModal(true);
                        setSelectedCustomer(customerMap[item.customerId]);
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-g"
                      onClick={() => {
                        setSelectedBill(item);
                        setOpenBillModal(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="items-empty">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openBillModal && (
        <BillModal
          closeModal={() => setOpenBillModal(false)}
          billData={selectedBill}
        />
      )}
      {openInvoiceModal && (
        <InvoiceModal
          closeModal={() => setOpenInvoiceModal(false)}
          invoiceNo={selectedBill?.billNo}
        />
      )}
    </div>
  );
};

export default Invoices;
