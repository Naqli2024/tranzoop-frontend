import React from "react";

const AddCustomerModal = ({closeModal}) => {
  return (
<div class="po-m-overlay">
  <div class="po-m-box po-m-sm">
    <div class="po-m-header">
      <span>Add Party</span>
      <button class="po-m-close" onClick={()=>closeModal(false)}>✕</button>
    </div>

    <div class="po-m-grid po-m-2">
      <div class="po-m-field">
        <label>Full Name *</label>
        <input class="po-m-input" placeholder="Name" />
      </div>
      <div class="po-m-field">
        <label>Mobile *</label>
        <input class="po-m-input" type="tel" placeholder="Phone" />
      </div>
    </div>

    <div class="po-m-field">
      <label>Address</label>
      <textarea class="po-m-input" rows="2" placeholder="Address"></textarea>
    </div>

    <div class="po-m-footer">
      <button class="po-m-btn" onClick={()=>closeModal(false)}>Cancel</button>
      <button class="po-m-btn po-m-primary">Save</button>
    </div>
  </div>
</div>
  );
};

export default AddCustomerModal;
