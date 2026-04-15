import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import NewPurchase from "./NewPurchase";

const Purchase = () => {
  const [openNewPurchase, setOpenNewPurchase] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="purchase-container">
      {openNewPurchase ? (
        <NewPurchase backToList={()=>setOpenNewPurchase(false)}/>
      ) : (
        <div className="purchase-container">
          <div className="wo-ph">
            <span className="wo-ph-title">🏷️ Purchase</span>
            <div className="wo-ph-actions">
              <button class="btn btn-b btn-sm">Export</button>
              <button class="btn btn-p btn-sm" onClick={()=>setOpenNewPurchase(true)}>
                <IoAdd size={15} /> New Purchase
              </button>
            </div>
          </div>
          <div class="items-filter-bar">
            <input
              class="items-inp"
              style={{ flex: "1", maxWidth: "300px" }}
              placeholder="Search by supplier name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="d-flex gap-2">
              <select className="sel">
                <option value="">All</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Year">This Year</option>
              </select>
              <select className="sel">
                <option value="Today">Payment Status</option>
                <option value="Today">Pending</option>
                <option value="This Week">Partial</option>
                <option value="This Month">Paid</option>
              </select>
            </div>
          </div>
          <div class="items-table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Tyre Brand & Model</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Rate(₹)</th>
                  <th>GST(%)</th>
                  <th>Supplier Name</th>
                  <th>Supplier Invoice No</th>
                  <th>Purchase Date</th>
                  <th>Due Date</th>
                  <th>Payment Status</th>
                  <th>Total</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>MRF Zapper</td>
                  <td>Tyres 2W</td>
                  <td>100/90-17</td>
                  <td>10</td>
                  <td>₹2,000</td>
                  <td>18%</td>
                  <td>MRF Dealer</td>
                  <td>INV-101</td>
                  <td>14-Apr-2026</td>
                  <td>30-Apr-2026</td>
                  <td>
                    <span class="tag t-ok">Paid</span>
                  </td>
                  <td>₹23,600</td>
                  <td style={{ textAlign: "center" }}>
                    <button className="btn btn-sm btn-g me-2">View</button>
                    <button className="btn btn-sm btn-b">Edit</button>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>Apollo Actizip</td>
                  <td>Tyres 4W</td>
                  <td>90/100-10</td>
                  <td>15</td>
                  <td>₹1,500</td>
                  <td>18%</td>
                  <td>Apollo Distributor</td>
                  <td>INV-102</td>
                  <td>13-Apr-2026</td>
                  <td>28-Apr-2026</td>
                  <td>
                    <span class="tag t-pending">Pending</span>
                  </td>
                  <td>₹26,550</td>
                  <td style={{ textAlign: "center" }}>
                    <button className="btn btn-sm btn-g me-2">View</button>
                    <button className="btn btn-sm btn-b">Edit</button>
                  </td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>CEAT Milaze</td>
                  <td>Tyres 2W</td>
                  <td>3.00-18</td>
                  <td>8</td>
                  <td>₹1,800</td>
                  <td>18%</td>
                  <td>CEAT Supplier</td>
                  <td>INV-103</td>
                  <td>12-Apr-2026</td>
                  <td>27-Apr-2026</td>
                  <td>
                    <span class="tag t-partial">Partial</span>
                  </td>
                  <td>₹16,992</td>
                  <td style={{ textAlign: "center" }}>
                    <button className="btn btn-sm btn-g me-2">View</button>
                    <button className="btn btn-sm btn-b">Edit</button>
                  </td>
                </tr>

                {/* <tr>
      <td colSpan="13" className="items-empty">
        No items found
      </td>
    </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
