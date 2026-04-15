import React, { useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const NewPurchase = ({ backToList }) => {
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Bridgestone Turanza T005",
      category: "Tyres 4W",
      size: "205/55 R16",
      qty: 20,
      rate: 5400,
      gst: 28,
    },
    {
      id: 2,
      name: "Michelin Pilot Sport 4",
      category: "Tyres 2W",
      size: "225/45 R17",
      qty: 12,
      rate: 8200,
      gst: 28,
    },
  ]);


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
        size: "",
        qty: 1,
        rate: 0,
        gst: 18,
      },
    ]);
  };

  /* Delete Row */
  const deleteItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  /* Update Field */
  const updateItem = (id, field, value) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  /* Calculations */
  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);

  const gstTotal = items.reduce(
    (s, i) => s + (i.qty * i.rate * i.gst) / 100,
    0,
  );

  const grandTotal = subtotal + gstTotal;

  return (
    <div className="purchase-container">
      <div className="wo-ph">
        <span className="wo-ph-title">
          <IoArrowBackOutline cursor={"pointer"} onClick={backToList} /> New
          Purchase
        </span>
        <div className="wo-ph-actions">
          <button class="btn btn-b btn-sm">Import</button>
        </div>
      </div>
      <div className="purchase-wrap">
        {/* Top Section */}
        <div className="purchase-top">
          <div className="purchase-card purchase-grid-2">
            <div>
              <label className="purchase-label">Supplier Search</label>
              <input
                className="purchase-input"
                placeholder="Start typing supplier name..."
              />
            </div>
            <div>
              <label className="purchase-label">Supplier GSTIN</label>
              <input
                className="purchase-input"
                value="07ABCT1234Z1Z"
                readOnly
              />
            </div>
          </div>
          <div className="purchase-card purchase-grid-2 small">
            <div>
              <label className="purchase-label">Bill Number</label>
              <input className="purchase-input" value="PUR-2024-01" />
            </div>

            <div>
              <label className="purchase-label">Date</label>
              <input className="purchase-input" type="date" />
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
                          value={i.name}
                          onChange={(e) =>
                            updateItem(i.id, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="purchase-input"
                          value={i.category}
                          onChange={(e) =>
                            updateItem(i.id, "category", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="purchase-input"
                          value={i.size}
                          onChange={(e) =>
                            updateItem(i.id, "size", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="purchase-input"
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
                          value={i.gst}
                          onChange={(e) =>
                            updateItem(i.id, "gst", +e.target.value)
                          }
                        />
                      </td>
                      <td className="purchase-amount">
                        ₹{total.toLocaleString("en-IN")}
                      </td>
                      <td>
                        <button
                          className="purchase-del"
                          onClick={() => deleteItem(i.id)}
                        >
                          <MdDeleteOutline size={20} color="red"/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button className="purchase-add" onClick={addItem}>
            + Add Another Item
          </button>
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
        </div>

        {/* Bottom Section */}
       <div className="purchase-bottom">

      {/* Notes */}
      <div className="purchase-card">
        <label className="purchase-label">Purchase Notes</label>

        <textarea
          className="purchase-textarea"
          placeholder="Add internal notes..."
        />

        {/* Upload Box */}
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

      {/* Summary */}
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
        <div className="purchase-inventory">
          📈 Inventory Addition  
          <small>32 New Units will be added</small>
        </div>
        <button className="purchase-btn">
          💾 Save & Update Stock
        </button>

      </div>
    </div>
      </div>
    </div>
  );
};

export default NewPurchase;
