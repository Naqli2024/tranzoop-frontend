import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "../../../redux/Auth/AuthSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { BsPrinter } from "react-icons/bs";
import Logo from "../../../assets/images/logo.jpg";
import { QRCodeCanvas } from "qrcode.react";
import { getInvoiceByBillNo } from "../../../redux/POS/BillSlice";
import { LuDownload } from "react-icons/lu";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceModal({ closeModal, invoiceNo }) {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [invoiceData, setInvoiceData] = useState(null);
  const invoiceRef = useRef();

    useEffect(() => {
      if (!invoiceNo) return;
      const fetchInvoice = async () => {
        try {
          setLoading(true);
          const res = await dispatch(
            getInvoiceByBillNo({ billNo: invoiceNo })
          ).unwrap();
          setInvoiceData(res.data.invoice);
        } catch (err) {
          toast.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchInvoice();
    }, [dispatch, invoiceNo]);

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

  const gstData = (invoiceData?.items || [])?.map((item) => {
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

  const gstTotals = (gstData || []).reduce(
    (acc, row) => {
      acc.taxable += row.taxable || 0;
      acc.cgst += row.cgstAmount || 0;
      acc.sgst += row.sgstAmount || 0;
      acc.totalTax += row.totalTax || 0;
      return acc;
    },
    { taxable: 0, cgst: 0, sgst: 0, totalTax: 0 }
  );

  const totalQty = (invoiceData?.items || [])?.reduce(
    (acc, i) => acc + i.quantity,
    0
  );

  const subTotal = (invoiceData?.items || [])?.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  const totalGST = (invoiceData?.items || [])?.reduce(
    (acc, i) => acc + (i.price * i.quantity * i.gst) / 100,
    0
  );

  const cgstTotal = totalGST / 2;
  const sgstTotal = totalGST / 2;

  const grandTotal = subTotal + totalGST;

  const handlePrint = () => {
    window.print();
  };

const handleDownload = async () => {
  try {
    const element = invoiceRef.current;

    const canvas = await html2canvas(element, {
      scale: 2, 
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210; 
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Invoice-${invoiceData.billNo}.pdf`);
  } catch (error) {
    console.error(error);
    toast.error("Failed to download invoice");
  }
};

  if (!invoiceData) return <Loader isLoading={true} />;

  return (
    <div className="inv-overlay" onClick={closeModal}>
      {loading && <Loader isLoading={loading} />}
      <div className="inv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="inv-modal-body"  ref={invoiceRef}>
          <div className="inv-tax-inv-text">Tax Invoice</div>
          <div className="inv-top-date">
            <p>Invoice No: <span>{invoiceData.billNo}</span></p>
            <p>Dated: <span>{formatDate(invoiceData?.date)}</span></p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="inv-logo">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="inv-qr-code">
              <QRCodeCanvas value={`https://tranzoop.com/invoice/${invoiceNo}`} size={70} />
            </div>
          </div>
          <div className="inv-header">
            <div>
              <div className="inv-shop-name">
                {invoiceData?.business?.name || "Tyre Shop"}
              </div>
              <div className="inv-shop-detail">
                {invoiceData?.business?.address}
              </div>
              <div className="inv-shop-detail">+91 {invoiceData?.business?.mobile}
              </div>
              <div className="inv-shop-gstin">
                GSTIN: {invoiceData?.business?.gstNo || "N/A"}
              </div>
            </div>
            <div>
              <div>Bill To:</div>
              <div className="inv-shop-name">
                {invoiceData?.customer?.name}
              </div>
              <div className="inv-shop-detail">
                {invoiceData?.customer?.address}
              </div>
              <div className="inv-shop-detail">+91 {invoiceData?.customer?.mobile || "—"}
              </div>
              <div className="inv-shop-gstin">
                GSTIN: {invoiceData?.customer?.gstNo || "N/A"}
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
        <div className="print-btn mb-3" onClick={handlePrint}>
          <BsPrinter size={20} />
        </div>
        <div className="print-btn" onClick={handleDownload}>
          <LuDownload size={20} />
        </div>
      </div>
    </div>
  );
}
