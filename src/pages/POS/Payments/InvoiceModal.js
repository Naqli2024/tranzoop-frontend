import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "../../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { BsPrinter } from "react-icons/bs";

export default function InvoiceModal({ closeModal, invoiceData, customerData }) {
  const [userData, setUserData] = useState();
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

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString("en-IN");
  };

  const numberToWords = (num) => {
    if (num === 0) return "Zero Rupees";

    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six",
      "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
      "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"
    ];

    const b = [
      "", "", "Twenty", "Thirty", "Forty",
      "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
      if (n < 1000)
        return a[Math.floor(n / 100)] + " Hundred " + inWords(n % 100);
      if (n < 100000)
        return inWords(Math.floor(n / 1000)) + " Thousand " + inWords(n % 1000);
      if (n < 10000000)
        return inWords(Math.floor(n / 100000)) + " Lakh " + inWords(n % 100000);
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore " +
        inWords(n % 10000000)
      );
    };

    return inWords(num).trim() + " Rupees Only";
  };

  const getGSTSplit = (gst) => {
    const half = gst / 2;
    return { cgstRate: half, sgstRate: half };
  };

  const gstData = invoiceData?.items?.map((item) => {
    const taxable = item.price * item.quantity;

    const { cgstRate, sgstRate } = getGSTSplit(item.gst);

    const cgstAmount = (taxable * cgstRate) / 100;
    const sgstAmount = (taxable * sgstRate) / 100;

    return {
      hsn: item.hsn || "-",
      taxable,
      cgstRate,
      cgstAmount,
      sgstRate,
      sgstAmount,
      totalTax: cgstAmount + sgstAmount,
    };
  });

  const getPriceWithGST = (price, gst) => {
    return price + (price * gst) / 100;
  };

  const gstTotals = gstData.reduce(
    (acc, row) => {
      acc.taxable += row.taxable || 0;
      acc.cgst += row.cgstAmount || 0;
      acc.sgst += row.sgstAmount || 0;
      acc.totalTax += row.totalTax || 0;
      return acc;
    },
    { taxable: 0, cgst: 0, sgst: 0, totalTax: 0 }
  );

  const totalQty = invoiceData?.items?.reduce(
    (acc, i) => acc + i.quantity,
    0
  );

  const subTotal = invoiceData?.items?.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  const totalGST = invoiceData?.items?.reduce(
    (acc, i) => acc + (i.price * i.quantity * i.gst) / 100,
    0
  );

  const cgstTotal = totalGST / 2;
  const sgstTotal = totalGST / 2;

  const grandTotal = subTotal + totalGST;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="inv-overlay" onClick={closeModal}>
      {loading && <Loader isLoading={loading} />}
      <div className="inv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="inv-modal-body">
          <div className="inv-tax-inv-text">Tax Invoice</div>
          <div className="inv-top-date">
            <p>Invoice No: <span>{invoiceData.billNo}</span></p>
            <p>Dated: <span>{formatDate(invoiceData?.createdAt)}</span></p>
          </div>
          <div className="inv-header">
            <div>
              <div className="inv-shop-name">
                {userData?.business?.shopName || "Tyre Shop"}
              </div>
              <div className="inv-shop-detail">
                {userData?.business?.address}
              </div>
              <div className="inv-shop-detail">+91 {userData?.business?.mobile}
              </div>
              <div className="inv-shop-gstin">
                GSTIN: {userData?.business?.gstNo || "N/A"}
              </div>
            </div>
            <div>
              <div>Bill To:</div>
              <div className="inv-shop-name">
                {invoiceData?.customerName}
              </div>
              <div className="inv-shop-detail">
                {customerData?.address}
              </div>
              <div className="inv-shop-detail">+91 {customerData?.mobile || "—"}
              </div>
              <div className="inv-shop-gstin">
                GSTIN: {userData?.business?.gstNo || "N/A"}
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="inv-table-container">
            <table className="inv-table">
              <thead>
                <tr>
                  <th>SI<br />No.</th>
                  <th>Description of Goods</th>
                  <th>HSN/SAC</th>
                  <th>Quantity</th>
                  <th>Rate<br />(Incl. of Tax)</th>
                  <th>Rate</th>
                  <th>Per</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData?.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="des-goods">{item?.itemName || "-"}</td>
                    <td>{item?.hsn || "-"}</td>
                    <td>{item?.quantity || 0}</td>
                    <td>
                      ₹{formatCurrency(getPriceWithGST(item.price, item.gst))}
                    </td>

                    <td>
                      ₹{formatCurrency(item.price)}
                    </td>
                    <td>{item?.uom || "-"}</td>
                    <td className="fw-bold">₹{formatCurrency(item?.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="inv-spacer">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td className="text-italic" style={{ textAlign: "right", fontWeight: 600 }}>
                    SGST
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="fw-bold">₹{formatCurrency(gstTotals.sgst)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="text-italic" style={{ textAlign: "right", fontWeight: 600 }}>
                    CGST
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="fw-bold">₹{formatCurrency(gstTotals.cgst)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="text-italic" style={{ textAlign: "right", fontWeight: 600 }}>
                    ROUND OFF
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="fw-bold">₹{formatCurrency(invoiceData?.roundOff || 0)}</td>
                </tr>
                <tr style={{ borderTop: "1px solid #000" }}>
                  <td></td>
                  <td><b>Total</b></td>
                  <td></td>
                  <td style={{ textAlign: "center" }}><b>{invoiceData?.items?.reduce((acc, i) => acc + i.quantity, 0)} {invoiceData?.items[0]?.uom}</b></td>
                  <td colSpan={3}></td>
                  <td className="fw-bold">₹{formatCurrency(invoiceData?.grandTotal)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="inv-amount-in-word">
            <div className="amt-charge">Amount Chargeable (in words)</div>
            <div className="amt-charge-end">E. & O.E</div>
          </div>
          <div className="amt-rupee">Indian Rupees {numberToWords(grandTotal)}</div>
          <div className="gst-summary-container">
            <table className="gst-table">
              <thead>
                <tr>
                  <th rowSpan={2}>HSN/SAC</th>
                  <th rowSpan={2}>Taxable Value</th>
                  <th colSpan="2">CGST</th>
                  <th colSpan="2">SGST/UTGST</th>
                  <th rowSpan={2}>Total<br />Tax Amount</th>
                </tr>
                <tr>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {gstData.map((row, i) => (
                  <tr key={i}>
                    <td>{row.hsn}</td>
                    <td>₹{formatCurrency(row.taxable)}</td>
                    <td>{row.cgstRate}%</td>
                    <td>₹{formatCurrency(row.cgstAmount)}</td>
                    <td>{row.sgstRate}%</td>
                    <td>₹{formatCurrency(row.sgstAmount)}</td>
                    <td>₹{formatCurrency(row.totalTax)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>₹{formatCurrency(gstTotals.taxable)}</td>
                  <td></td>
                  <td>₹{formatCurrency(gstTotals.cgst)}</td>
                  <td></td>
                  <td>₹{formatCurrency(gstTotals.sgst)}</td>
                  <td>₹{formatCurrency(gstTotals.totalTax)}</td>
                </tr>
              </tfoot>
            </table>
            <div className="amount-words">
              Tax Amount (in words): <b>Indian Rupees {numberToWords(Math.round(gstTotals.totalTax))}</b>
            </div>
            <div className="invoice-footer">
              <div className="declaration">
                <div className="head">Declaration</div>
                <p>
                  We declare that this invoice shows the actual price of the goods
                  described and that all particulars are true and correct.
                </p>
              </div>
              <div className="signature">
                <p className="fw-bold">for {userData?.business?.shopName || "Tyre Shop"}</p>
                <div className="sign-space"></div>
                <p>Authorised Signatory</p>
              </div>
            </div>
            <div className="invoice-note mb-5">
              <div className="gen-inv">This is a Computer Generated Invoice</div>
            </div>
          </div>
        </div>
      </div>
      <div className="invoice-download-btn">
        <div className="print-btn" onClick={handlePrint}>
          <BsPrinter size={20} />
        </div>
      </div>
    </div>
  );
}
