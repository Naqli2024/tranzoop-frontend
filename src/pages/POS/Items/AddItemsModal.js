import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { addItems, editItems, getAllItems } from "../../../redux/POS/ItemSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddItemsModal = ({ closeModal, editData,setItemData}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    itemImage: null,
    itemName: "",
    sku: "",
    barCode: "",
    category: "",
    hsn: "",
    gst: "",
    uom: "",
    mrp: "",
    cost: "",
    margin: "",
    openingStock: "",
    type: "product",
  });

useEffect(() => {
  if (editData) {
    setFormData({
      itemImage: null,
      itemName: editData.itemName || "",
      sku: editData.sku || "",
      barCode: editData.barCode || "",
      category: editData.category || "",
      hsn: editData.hsn || "",
      gst: editData.gst || "",
      uom: editData.uom || "",
      mrp: editData.mrp || "",
      cost: editData.cost || "",
      margin: editData.margin || "",
      openingStock: editData.openingStock || "",
      type: editData.type || "product",
    });
  } else {
    setFormData({
      itemImage: null,
      itemName: "",
      sku: "",
      barCode: "",
      category: "",
      hsn: "",
      gst: "",
      uom: "",
      mrp: "",
      cost: "",
      margin: "",
      openingStock: "",
      type: "product",
    });
  }
}, [editData]);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "itemImage") {
    setFormData((prev) => ({
      ...prev,
      itemImage: files[0],
    }));
  } else {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "mrp" || name === "cost") {
        const mrp = parseFloat(updated.mrp) || 0;
        const cost = parseFloat(updated.cost) || 0;

        if (cost > 0) {
          updated.margin = (((mrp - cost) / cost) * 100);
        } else {
          updated.margin = 0;
        }
      }

      return updated;
    });
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.itemName || !formData.sku || !formData.mrp) {
    toast.error("Please fill required fields");
    return;
  }

  try {
    setLoading(true);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    let response;

    if (editData) {
      response = await dispatch(
        editItems({
          itemId: editData._id,
          payload: data,
        })
      ).unwrap();
    } else {
      response = await dispatch(addItems(data)).unwrap();
    }

    const res = await dispatch(getAllItems()).unwrap();

    const items =
      res?.items ||
      res?.data?.items ||
      res?.data ||
      (Array.isArray(res) ? res : []);

    setItemData(items);

    toast.success(response.message);

    closeModal(false);

  } catch (error) {
    console.error(error);
    toast.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      {loading && <Loader isLoading={loading} />}
      <div class="po-m-overlay">
        <div class="po-m-box po-m-md">
          <div class="po-m-header">
            <span>Add New Item</span>
            <button class="po-m-close" onClick={() => closeModal(false)}>
              ✕
            </button>
          </div>

          <div class="po-m-grid po-m-4">
            <div class="po-m-field">
              <label>Item Image</label>
              <input
                class="po-m-input"
                name="itemImage"
                type="file"
                onChange={handleChange}
              />
            </div>
            <div class="po-m-field">
              <label>Item Name *</label>
              <input
                class="po-m-input"
                placeholder="Product name"
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
              />
            </div>
            <div class="po-m-field">
              <label>SKU *</label>
              <input
                class="po-m-input"
                placeholder="SKU code"
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
              />
            </div>
            <div class="po-m-field">
              <label>Barcode</label>
              <input
                class="po-m-input"
                placeholder="Barcode"
                type="text"
                name="barCode"
                value={formData.barCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="po-m-grid po-m-4">
            <div class="po-m-field">
              <label>Category</label>
              <input
                class="po-m-input"
                placeholder="Category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div class="po-m-field">
              <label>HSN Code</label>
              <input
                class="po-m-input"
                placeholder="HSN"
                type="number"
                name="hsn"
                value={formData.hsn}
                onChange={handleChange}
              />
            </div>
            <div class="po-m-field">
              <label>GST %</label>
              <input
                class="po-m-select"
                type="number"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
              />
            </div>
            <div class="po-m-field">
              <label>UOM</label>
              <input
                class="po-m-input"
                placeholder="NOS/KGS/LTR"
                type="text"
                name="uom"
                value={formData.uom}
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="po-m-grid po-m-4">
            <div class="po-m-field">
              <label>MRP (₹) *</label>
              <input
                class="po-m-input"
                placeholder="0.00"
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
              />
            </div>
            <div class="po-m-field">
              <label>Cost (₹)</label>
              <input
                class="po-m-input"
                placeholder="0.00"
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
              />
            </div>
            <div class="po-m-field">
              <label>Margin %</label>
              <input
  class="po-m-input"
  type="number"
  name="margin"
  value={formData.margin}
  readOnly
/>
            </div>
            <div class="po-m-field">
              <label>Opening Stock</label>
              <input
                class="po-m-input"
                type="number"
                name="openingStock"
                value={formData.openingStock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="po-m-footer">
            <button class="po-m-btn" onClick={() => closeModal(false)}>
              Cancel
            </button>
            <button class="po-m-btn po-m-primary" onClick={handleSubmit}>
              Save Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemsModal;