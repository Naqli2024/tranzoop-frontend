import React from "react";

const AddItemsModal = ({closeModal}) => {
  return (
    <div class="po-m-overlay">
      <div class="po-m-box po-m-md">
        <div class="po-m-header">
          <span>Add New Item</span>
          <button class="po-m-close" onClick={()=>closeModal(false)}>✕</button>
        </div>

        <div class="po-m-grid po-m-3">
          <div class="po-m-field">
            <label>Item Name *</label>
            <input class="po-m-input" placeholder="Product name" />
          </div>
          <div class="po-m-field">
            <label>SKU *</label>
            <input class="po-m-input" placeholder="SKU code" />
          </div>
          <div class="po-m-field">
            <label>Barcode</label>
            <input class="po-m-input" placeholder="Barcode" />
          </div>
        </div>

        <div class="po-m-grid po-m-4">
          <div class="po-m-field">
            <label>Category</label>
            <input class="po-m-input" placeholder="Category" />
          </div>
          <div class="po-m-field">
            <label>HSN Code</label>
            <input class="po-m-input" placeholder="HSN" />
          </div>
          <div class="po-m-field">
            <label>GST %</label>
            <select class="po-m-select">
              <option>18%</option>
              <option>12%</option>
              <option>5%</option>
              <option>0%</option>
            </select>
          </div>
          <div class="po-m-field">
            <label>UOM</label>
            <input class="po-m-input" placeholder="NOS/KGS/LTR" />
          </div>
        </div>

        <div class="po-m-grid po-m-4">
          <div class="po-m-field">
            <label>MRP (₹) *</label>
            <input class="po-m-input" type="number" placeholder="0.00" />
          </div>
          <div class="po-m-field">
            <label>Cost (₹)</label>
            <input class="po-m-input" type="number" placeholder="0.00" />
          </div>
          <div class="po-m-field">
            <label>Margin %</label>
            <input class="po-m-input po-m-readonly" value="0%" readOnly />
          </div>
          <div class="po-m-field">
            <label>Opening Stock</label>
            <input class="po-m-input" type="number" defaultValue="0" />
          </div>
        </div>

        <div class="po-m-footer">
          <button class="po-m-btn" onClick={()=>closeModal(false)}>Cancel</button>
          <button class="po-m-btn po-m-primary">Save Item</button>
        </div>
      </div>
    </div>
  );
};

export default AddItemsModal;
