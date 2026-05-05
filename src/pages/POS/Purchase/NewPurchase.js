import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAllSuppliers } from "../../../redux/POS/SupplierSlice";
import { addPurchase, getAllPurchase } from "../../../redux/POS/PurchaseSlice";
import Loader from "../../../components/Loader";

const NewPurchase = ({ backToList, setPurchaseData, viewData, isViewMode }) => {
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [openNewPurchase, setOpenNewPurchase] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [supplierData, setSupplierData] = useState([]);
  const [supplierSearch, setSupplierSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([
    {
      id: 1,
      name: "",
      category: "",
      size: "",
      hsn: "",
      sku: "",
      qty: "",
      rate: "",
      gst: "",
    }
  ]);

  useEffect(() => {
    dispatch(getAllSuppliers())
      .unwrap()
      .then((response) => {
        console.log(response)
        setSupplierData(response || []);
      })
      .catch((error) => {
        toast.error(error);
      })
  }, [dispatch]);

  const handleSave = async () => {
    if (!selectedSupplier) return toast.info("Select supplier");
    if (!invoiceNo) return toast.info("Enter invoice number");
    if (!purchaseDate) return toast.info("Select purchase date");
    if (!dueDate) return toast.info("Select due date");

    const payload = {
      supplierId: selectedSupplier._id,
      supplierInvoiceNo: invoiceNo,
      purchaseDate,
      dueDate,
      items: items.map((i) => ({
        itemName: i.name,
        category: i.category,
        size: i.size,
        hsn: i.hsn,
        sku: i.sku,
        quantity: i.qty,
        rate: i.rate,
        gst: i.gst,
      })),
    };

    try {
      setLoading(true)
      const res = await dispatch(addPurchase(payload)).unwrap();
      toast.success(res.message);
      setLoading(false)
      backToList();
      dispatch(getAllPurchase())
        .unwrap()
        .then((response) => {
          setPurchaseData(response?.purchases || []);
        })
    } catch (err) {
      toast.error(err);
    }
  };

  const filteredSuppliers = supplierData.filter((s) =>
    s.name.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  const handleFileClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(selected.type)) {
      toast.error("Only PDF, PNG, JPG allowed");
      return;
    }

    if (selected.size > maxSize) {
      toast.error("File must be less than 5MB");
      return;
    }

    setFile(selected);
    toast.success("File attached successfully");
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        name: "",
        category: "",
        size: "",
        hsn: "",
        sku: "",
        qty: "",
        rate: "",
        gst: "",
      },
    ]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);

  const gstTotal = items.reduce(
    (s, i) => s + (i.qty * i.rate * i.gst) / 100,
    0,
  );

  const grandTotal = subtotal + gstTotal;

  useEffect(() => {
    if (viewData) {
      setSelectedSupplier({
        _id: viewData.supplierId,
        name: viewData.supplierName,
        gstNumber: viewData.supplierGST,
        mobile: viewData.supplierMobile,
        email: viewData.supplierEmail,
      });

      setSupplierSearch(viewData.supplierName);
      setInvoiceNo(viewData.supplierInvoiceNo);
      setPurchaseDate(viewData.purchaseDate?.slice(0, 10));
      setDueDate(viewData.dueDate?.slice(0, 10));

      setItems(
        viewData.items.map((i, index) => ({
          id: index + 1,
          name: i.itemName,
          category: i.category,
          size: i.size,
          hsn: i.hsn,
          sku: i.sku,
          qty: i.quantity,
          rate: i.rate,
          gst: i.gst,
        }))
      );
    }
  }, [viewData]);

  const generateInvoiceNo = () => {
  const prefix = "INV";
  const timestamp = Date.now(); 
  const random = Math.floor(100 + Math.random() * 900); 

  return `${prefix}-${timestamp}-${random}`;
};

useEffect(() => {
  if (!isViewMode) {
    setInvoiceNo(generateInvoiceNo());
  }
}, []);

  return (
    <div className="purchase-container">
      {loading && <Loader isLoading={loading} />}
      <div className="wo-ph">
        <span className="wo-ph-title">
          <IoArrowBackOutline cursor={"pointer"} onClick={backToList} />
          {isViewMode ? "Purchase Details" : "New Purchase"}
        </span>
        {/* {!isViewMode &&
          <div className="wo-ph-actions">
            <button class="btn btn-b btn-sm">Import</button>
          </div>} */}
      </div>
      <div className="purchase-wrap">
        <div className="purchase-top">
          <div className="purchase-card purchase-grid-2">
            <div style={{ position: "relative" }}>
              <label className="purchase-label">Supplier Name</label>
              <input
                className="purchase-input"
                placeholder="Start typing supplier name..."
                value={supplierSearch}
                onChange={(e) => {
                  setSupplierSearch(e.target.value);
                  setShowSuggestions(true);
                }}
              />
              {showSuggestions && supplierSearch && (
                <div className="suggestion-box">
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((s) => (
                      <div
                        key={s._id}
                        className="suggestion-item"
                        onClick={() => {
                          setSelectedSupplier(s);
                          setSupplierSearch(s.name);
                          setShowSuggestions(false);
                        }}
                      >
                        {s.name}
                      </div>
                    ))
                  ) : (
                    <div className="suggestion-item">No supplier found</div>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="purchase-label">Supplier GST No</label>
              <input
                className="purchase-input"
                value={selectedSupplier?.gstNumber || ""}
                readOnly
              />
            </div>
            <div>
              <label className="purchase-label">Mobile</label>
              <input
                className="purchase-input"
                value={selectedSupplier?.mobile || ""}
                readOnly
              />
            </div>
            <div>
              <label className="purchase-label">Email</label>
              <input
                className="purchase-input"
                value={selectedSupplier?.email || ""}
                readOnly
              />
            </div>
          </div>
          <div className="purchase-card purchase-grid-2 small">
            <div>
              <label className="purchase-label"> Supplier Invoice No <small>(Auto-generated, editable)</small></label>
              <input
                className="purchase-input"
                disabled={isViewMode}
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
            </div>
            <div>
              <label className="purchase-label">Purchase Date</label>
              <input
                className="purchase-input"
                disabled={isViewMode}
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
            <div>
              <label className="purchase-label">Due Date</label>
              <input
                className="purchase-input"
                disabled={isViewMode}
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="purchase-card">
          <div className="purchase-table-wrap">
            <table className="purchase-table">
              <thead>
                <tr>
                  <th>Tyre Brand & Model</th>
                  <th>Category</th>
                  <th>SKU</th>
                  <th>HSN Code</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>GST %</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => {
                  const total = i.qty * i.rate;
                  return (
                    <tr key={i.id}>
                      <td>
                        <input
                          className="purchase-input"
                          disabled={isViewMode}
                          value={i.name}
                          onChange={(e) =>
                            updateItem(i.id, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="purchase-input"
                          disabled={isViewMode}
                          value={i.category}
                          onChange={(e) =>
                            updateItem(i.id, "category", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="purchase-input"
                          disabled={isViewMode}
                          value={i.sku}
                          onChange={(e) =>
                            updateItem(i.id, "sku", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="purchase-input"
                          disabled={isViewMode}
                          value={i.hsn}
                          onChange={(e) =>
                            updateItem(i.id, "hsn", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="purchase-input"
                          disabled={isViewMode}
                          value={i.size}
                          onChange={(e) =>
                            updateItem(i.id, "size", +e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="purchase-input"
                          disabled={isViewMode}
                          value={i.qty}
                          onChange={(e) =>
                            updateItem(i.id, "qty", +e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="purchase-input"
                          disabled={isViewMode}
                          value={i.rate}
                          onChange={(e) =>
                            updateItem(i.id, "rate", +e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="purchase-input"
                          disabled={isViewMode}
                          value={i.gst}
                          onChange={(e) =>
                            updateItem(i.id, "gst", +e.target.value)
                          }
                        />
                      </td>
                      <td className="purchase-amount">
                        ₹{total.toLocaleString("en-IN")}
                      </td>
                      {!isViewMode && <td>
                        <button
                          className="purchase-del"
                          onClick={() => deleteItem(i.id)}
                        >
                          <MdDeleteOutline size={20} color="red" />
                        </button>
                      </td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!isViewMode &&
            <button className="purchase-add" onClick={addItem}>
              + Add Another Item
            </button>}
          <div className="purchase-summary">
            <div className="purchase-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="purchase-row">
              <span>Total GST</span>
              <span>₹{gstTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="purchase-total">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="purchase-btn" onClick={handleSave}>
              💾 Save & Update Stock
            </button>
          </div>
        </div>
        {/* <div className="purchase-bottom">
          <div className="purchase-card">
            <label className="purchase-label">Purchase Notes</label>
            <textarea
              className="purchase-textarea"
              placeholder="Add internal notes..."
            />
            <div className="purchase-upload" onClick={handleFileClick}>
              📎 Attach Supplier Invoice
              <span>PDF, PNG up to 5MB</span>
              <input
                type="file"
                ref={fileRef}
                style={{ display: "none" }}
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </div>
            {file && (
              <div className="purchase-file-preview">
                📄 {file.name}
              </div>
            )}
          </div>
          <div className="purchase-card purchase-summary">
            <div className="purchase-row">
              <span>Subtotal</span>
              <span>₹ 2,06,400</span>
            </div>
            <div className="purchase-row">
              <span>Input CGST (14%)</span>
              <span>₹ 28,896</span>
            </div>
            <div className="purchase-row">
              <span>Input SGST (14%)</span>
              <span>₹ 28,896</span>
            </div>
            <div className="purchase-total">
              <span>Grand Total</span>
              <span>₹ 2,64,192</span>
            </div>
            <button className="purchase-btn" onClick={handleSave}>
              💾 Save & Update Stock
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NewPurchase;
