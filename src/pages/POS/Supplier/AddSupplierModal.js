import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer, getAllCustomers } from "../../../redux/POS/CustomerSlice";
import { toast } from "react-toastify";
import { addSupplier, getAllSuppliers, updateSupplier } from "../../../redux/POS/SupplierSlice";

const AddSupplierModal = ({ closeModal,setSupplierData,editData  }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    gstNumber: "",
  });

  useEffect(() => {
  if (editData) {
    setFormData({
      name: editData.name || "",
      mobile: editData.mobile || "",
      email: editData.email || "",
      address: editData.address || "",
      gstNumber: editData.gstNumber || "",
    });
  }
}, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);
    let res;
    if (editData) {
      res = await dispatch(updateSupplier({ id: editData._id, payload: formData })).unwrap();
    } else {
      res = await dispatch(addSupplier(formData)).unwrap();
    }
    const updated = await dispatch(getAllSuppliers()).unwrap();
    setSupplierData(updated || []);
    toast.success(res.message);
    closeModal(false);
  } catch (error) {
    toast.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="po-m-overlay">
      <div className="po-m-box po-m-sm">
        <div className="po-m-header">
          <span>{editData ? "Edit Supplier" : "Add Supplier"}</span>
          <button className="po-m-close" onClick={() => closeModal(false)}>
            ✕
          </button>
        </div>
        <div className="po-m-grid po-m-2">
          <div className="po-m-field">
            <label>Full Name</label>
            <input
              className="po-m-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="po-m-field">
            <label>Mobile</label>
            <input
              className="po-m-input"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
        </div>
        <div className="po-m-field">
          <label>Email</label>
          <input
            className="po-m-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Company"
          />
        </div>
        <div className="po-m-field my-2">
          <label>GST Number</label>
          <input
            className="po-m-input"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="GST Number"
          />
        </div>
        <div className="po-m-field my-2">
          <label>Address</label>
          <textarea
            className="po-m-input"
            rows="2"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>
        <div className="po-m-footer">
          <button className="po-m-btn" onClick={() => closeModal(false)}>
            Cancel
          </button>
          <button
            className="po-m-btn po-m-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierModal;