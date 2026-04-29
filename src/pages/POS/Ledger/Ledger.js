import React, { useEffect, useState } from 'react';
import { IoAdd } from "react-icons/io5";
import { getAgingReport, getCustomerLedger, getCustomerLedgerById, getDailySales, getPaymentSplit, getRevenueSplit, getSummary, getSupplierLedger, getSupplierLedgerById, getTopServices } from '../../../redux/POS/LedgerSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/Loader';
import { getCustomerById } from '../../../redux/POS/CustomerSlice';
import CustomerLedgerDetails from './CustomerLedgerDetails';
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { BsCreditCard2Back } from "react-icons/bs";
import SupplierLedgerDetails from './SupplierLedgerDetails';

const PL_TABS = [
  { id: 'report', label: '📊 P&L Summary' },
  { id: 'customer', label: '📊 Customers' },
  { id: 'supplier', label: '📊 Suppliers' },
  { id: 'services', label: '📋 Top Services' },
];

const paymentIcons = {
  cash: <FaMoneyBillWave size={25}/>,
  upi: <MdQrCodeScanner size={25}/>,
  card: <FaCreditCard size={25}/>,
  credit: <BsCreditCard2Back size={25}/>,
};
 
const vTypeClass = (t) => ({ payment: 'v-pmt', receipt: 'v-rcpt', journal: 'v-jnl', purchase: 'v-pur', sales: 'v-sal', contra: 'v-ctr' }[t] || '');
 
export default function Ledger() {
  const [activeTab, setActiveTab] = useState('report');
  const [summaryData, setSummaryData] = useState();
  const [agingData, setAgingData] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState();
  const [customerDetails, setCustomerDetails] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [revenueData, setRevenueData] = useState();
  const [serviceData, setServiceData] = useState();
  const [paymentData, setPaymentData] = useState();
  const [tSalesData, setTSales] = useState();
  const [supplierData, setSupplierData] = useState();
  const [selectedSupplierId, setSelectedSupplierId] = useState();
  const [supplierDetails, setSupplierDetails] = useState();
  const [selectedSupplier, setSelectedSupplier] = useState(null);

    useEffect(() => {
      setLoading(true);
      dispatch(getSummary())
        .unwrap()
        .then((response) => {
          setSummaryData(response.data);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
      setLoading(true);
      dispatch(getAgingReport())
        .unwrap()
        .then((response) => {
          setAgingData(response.data);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
      setLoading(true);
      dispatch(getRevenueSplit())
        .unwrap()
        .then((response) => {
          setRevenueData(response.data);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
      setLoading(true);
      dispatch(getPaymentSplit())
        .unwrap()
        .then((response) => {
          setPaymentData(response.data);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
      setLoading(true);
      dispatch(getCustomerLedger())
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

    useEffect(() => {
      setLoading(true);
      dispatch(getSupplierLedger())
        .unwrap()
        .then((response) => {
          setSupplierData(response.data);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
      setLoading(true);
      dispatch(getTopServices())
        .unwrap()
        .then((response) => {
          setServiceData(response.data);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
      setLoading(true);
      dispatch(getDailySales())
        .unwrap()
        .then((response) => {
          setTSales(response.data);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [dispatch]);

const handleViewLedger = async (customerId) => {
  try {
    setLoading(true);
    const res = await dispatch(getCustomerLedgerById(customerId)).unwrap();
    setCustomerDetails(res.data || []);
    setSelectedCustomerId(customerId);
  } catch (err) {
    toast.error(err);
  } finally {
    setLoading(false);
  }
};

const handleViewSupplierLedger = async (supplier) => {
  try {
    setLoading(true);
    const res = await dispatch(getSupplierLedgerById(supplier.supplierId)).unwrap();
    setSupplierDetails(res.data || []);
    setSelectedSupplier(supplier);
    setSelectedSupplierId(supplier.supplierId);
  } catch (err) {
    toast.error(err);
  } finally {
    setLoading(false);
  }
};


const filteredCustomers = Array.isArray(customerData)
  ? customerData.filter((c) =>
      c.customerName
        ?.toLowerCase()
        .includes(searchCustomer.toLowerCase())
    )
  : [];

const filteredSuppliers = Array.isArray(supplierData)
  ? supplierData.filter((s) =>
      s.supplierName?.toLowerCase().includes(searchCustomer.toLowerCase())
    )
  : [];

const totalRevenue = revenueData
  ? Object.values(revenueData).reduce((acc, val) => acc + val, 0)
  : 0;

const total = paymentData
  ? Object.values(paymentData).reduce((a, b) => a + b, 0)
  : 0;

const totalSales = Array.isArray(tSalesData)
  ? tSalesData.reduce((acc, item) => acc + (item.total || 0), 0)
  : 0;

  return (
    <div className="pl-wrap">
      {loading && <Loader isLoading={loading} />}
       <div className="wo-ph">
              <span className="wo-ph-title">
                💰 Accounting — P&L, Vouchers & Ledgers
              </span>
            </div>
      <div className="pl-tab-strip">
        {PL_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`pl-tab${activeTab === tab.id ? ' act' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
 
      {/* P&L Statement */}
      {activeTab === 'report' && (
        <div className="pl-tab-body" style={{ overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: 10, padding: 12, flexShrink: 0, flexWrap: 'wrap' }}>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l d-flex align-items-center">Today Sales <span style={{fontSize:"8px"}}>(without GST)</span></div>
              <div className="pl-mc-v">₹{summaryData?.todaySales.toLocaleString('en-IN') || 0}</div>
            </div>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Total Revenue</div>
              <div className="pl-mc-v">₹{summaryData?.totalRevenue.toLocaleString('en-IN') || 0}</div>
            </div>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Total Received</div>
              <div className="pl-mc-v">₹{summaryData?.totalReceived.toLocaleString('en-IN') || 0}</div>
            </div>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Total Outstanding</div>
              <div className="pl-mc-v">₹{summaryData?.totalOutstanding.toLocaleString('en-IN') || 0}</div>
            </div>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Supplier Payable</div>
              <div className="pl-mc-v">₹{summaryData?.supplierPayable.toLocaleString('en-IN') || 0}</div>
            </div>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Profit</div>
              <div className="pl-mc-v">₹{summaryData?.profit.toLocaleString('en-IN') || 0}</div>
            </div>
          </div>
 
          <div style={{ padding: '0 14px 60px' }}>
              <div className="pl-section mt-3">
                <div className={`pl-section-hdr pl-hdr-sales`}>Daily Sales — ₹{totalSales.toLocaleString('en-IN') || 0}</div>
                <div className="pl-body">
                  {Array.isArray(tSalesData) && tSalesData.map((sale, index) => (
  <div key={index} className="pl-row">
    <span className="pl-label">{sale.date}</span>
    <span className="pl-value">
      ₹{(sale.total || 0).toLocaleString("en-IN")}
    </span>
  </div>
))}
                </div>
              </div>
              <div className="pl-section mt-3">
                <div className={`pl-section-hdr pl-hdr-income`}>Aging Report — ₹{summaryData?.totalOutstanding.toLocaleString('en-IN') || 0}</div>
                <div className="pl-body">
                  {agingData && Object.entries(agingData).map(([range, amount]) => (
                    <div key={range} className="pl-row">
                      <span className="pl-label">{range} Days</span>
                      <span className="pl-value">₹{amount.toLocaleString('en-IN') || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pl-section mt-3">
                <div className={`pl-section-hdr pl-hdr-expenses`}>Revenue Split — {totalRevenue.toLocaleString('en-IN') || 0}</div>
                <div className="pl-body">
                  {revenueData && Object.entries(revenueData).map(([range, amount]) => (
                    <div key={range} className="pl-row">
                      <span className="pl-label">{range.toUpperCase()}</span>
                      <span className="pl-value">₹{amount.toLocaleString('en-IN') || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ledger-pay-container mt-3">
      <div className="ledger-pay-header">
        Payment Summary — ₹{total.toLocaleString("en-IN")}
      </div>

      <div className="ledger-pay-grid">
        {paymentData && Object.entries(paymentData).map(([key, value]) => (
          <div
            key={key}
            className={`ledger-pay-card ${value > 0 ? "active" : ""}`}
          >
            <div className="ledger-pay-icon">
              {paymentIcons[key]}
            </div>
            <div className="ledger-pay-label">{key.toUpperCase()}</div>
            <div className="ledger-pay-amount">
              ₹{value.toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>

    </div>


 
            <div className="pl-section mt-3">
              <div className="pl-section-hdr pl-hdr-net">
                Total Profit — ₹{summaryData?.profit.toLocaleString('en-IN') || 0}
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* Customers */}
      {activeTab === 'customer' && (
        <div>
          {!customerDetails && (
            <>
<input
          class="items-inp m-3"
          style={{ flex: "1", maxWidth: "350px" }}
          placeholder="Search customer…"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
        />                      
        <div class="items-table-container">
       <table>
  <thead>
    <tr>
      <th>Customer</th>
      <th>Total Bill</th>
      <th>Paid</th>
      <th>Balance</th>
      <th>Action</th>
    </tr>
  </thead>
<tbody>
  {filteredCustomers.length > 0 ? (
    filteredCustomers.map((c) => (
      <tr key={c.customerId}>
        <td>{c.customerName}</td>
        <td>₹{c.totalBill.toLocaleString("en-IN")}</td>
        <td>₹{c.totalPaid.toLocaleString("en-IN")}</td>
        <td className="text-danger">
          ₹{c.balance.toLocaleString("en-IN")}
        </td>
        <td>
          <button
            className="btn btn-sm btn-p"
            onClick={() => handleViewLedger(c.customerId)}
          >
            View Ledger
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
        No customers found
      </td>
    </tr>
  )}
</tbody>
</table>
</div>
</>)}
{customerDetails && (
 <CustomerLedgerDetails customerDetails={customerDetails} setCustomerDetails={setCustomerDetails}/>
)}
        </div>
      )}
      
      {/* Suppliers */}
      {activeTab === 'supplier' && (
        <div>
          {!supplierDetails && (
            <>
<input
          class="items-inp m-3"
          style={{ flex: "1", maxWidth: "350px" }}
          placeholder="Search customer…"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
        />                      
        <div class="items-table-container">
       <table>
  <thead>
    <tr>
      <th>Supplier</th>
      <th>Total Bill</th>
      <th>Total Purchase</th>
      <th>Balance</th>
      <th>Action</th>
    </tr>
  </thead>
<tbody>
  {filteredSuppliers.length > 0 ? (
    filteredSuppliers.map((s) => (
      <tr key={s.supplierId}>
        <td>{s.supplierName}</td>
        <td>₹{s.totalPurchase.toLocaleString("en-IN")}</td>
        <td>₹{s.totalPaid.toLocaleString("en-IN")}</td>
        <td className="text-danger">
          ₹{s.balance.toLocaleString("en-IN")}
        </td>
        <td>
          <button
            className="btn btn-sm btn-p"
            onClick={() => handleViewSupplierLedger(s)}
          >
            View Ledger
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
        No suppliers found
      </td>
    </tr>
  )}
</tbody>
</table>
</div>
</>)}
{supplierDetails && (
 <SupplierLedgerDetails supplierDetails={supplierDetails} setSupplierDetails={setSupplierDetails} selectedSupplier={selectedSupplier}/>
)}
        </div>
      )}

      {/* Top Services */}
      {activeTab === 'services' && (
            <div className="settings-grid p-3">
              {serviceData.map((data,index)=>(
                      <div className="settings-item">
        <p>{data.name}</p>
        <p>₹{data.total.toLocaleString("en-IN") || 0}</p>
      </div>
              ))}
    </div>
      )}
    </div>
  );
}