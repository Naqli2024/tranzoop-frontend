import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer, editCustomer, getAllCustomers } from "../../../redux/POS/CustomerSlice";
import { toast } from "react-toastify";

const AddCustomerModal = ({ closeModal,setCustomerData,editData,setEditData }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    mobile: "",
    gstNo: "",
    address: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
  if (editData) {
    setFormData(editData);
  }
}, [editData]);

const handleSubmit = async () => {
  try {
    setLoading(true);

    let res;

    if (editData) {
      res = await dispatch(
        editCustomer({
          customerId: editData._id,
          payload: formData,
        })
      ).unwrap();
    } else {
      res = await dispatch(addCustomer(formData)).unwrap();
    }
    const response = await dispatch(getAllCustomers()).unwrap();
    setCustomerData(response.data || []);
    toast.success(res.message);
    closeModal(false);
    setEditData(null);
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
          <span>Add Customer</span>
          <button className="po-m-close" onClick={() => closeModal(false)}>
            ✕
          </button>
        </div>
        <div className="po-m-grid po-m-2">
          <div className="po-m-field">
            <label>Full Name *</label>
            <input
              className="po-m-input"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>

          <div className="po-m-field">
            <label>Mobile *</label>
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
          <label>Company Name</label>
          <input
            className="po-m-input"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company"
          />
        </div>

        <div className="po-m-field mt-2">
          <label>GST Number</label>
          <input
            className="po-m-input"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            placeholder="GST No"
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

        <div className="po-m-field">
          <label>Type</label>
          <select
            className="po-m-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="B2B">B2B</option>
            <option value="B2C">B2C</option>
          </select>
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

export default AddCustomerModal;