import React, { useEffect, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

import { getAllItems } from "../../../redux/POS/ItemSlice";
import { getBillByBusinessId } from "../../../redux/POS/BillSlice";

const Stock = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const processStock = (items, bills) => {
    const soldMap = {};

    (bills || []).forEach((bill) => {
      (bill.items || []).forEach((billItem) => {
        if (billItem.type === "product") {
          const key = billItem.itemId || billItem.itemName;

          soldMap[key] = (soldMap[key] || 0) + billItem.quantity;
        }
      });
    });

    return (items || []).map((item) => {
      const key = item._id || item.itemName;

      const soldQty = soldMap[key] || 0;

      return {
        ...item,
        soldQty,
        currentStock: (item.openingStock || 0) - soldQty,
      };
    });
  };

  const finalItems = useMemo(() => {
    return processStock(items, bills);
  }, [items, bills]);

 
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return finalItems.filter(
      (p) =>
        !q ||
        p.itemName?.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q)
    );
  }, [search, finalItems]);


  const totalOpening = finalItems.reduce(
    (sum, i) => sum + (i.openingStock || 0),
    0
  );

  const totalSold = finalItems.reduce(
    (sum, i) => sum + (i.soldQty || 0),
    0
  );

  const totalClosing = finalItems.reduce(
    (sum, i) => sum + (i.currentStock || 0),
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itemsRes = await dispatch(getAllItems()).unwrap();
        const billsRes = await dispatch(
          getBillByBusinessId()
        ).unwrap();

        const itemsData =
          itemsRes?.items ||
          itemsRes?.data ||
          (Array.isArray(itemsRes) ? itemsRes : []);

        const billsData =
          billsRes?.data ||
          (Array.isArray(billsRes) ? billsRes : []);
        setItems(itemsData);
        setBills(billsData);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="stock-container">
      {loading && <Loader isLoading={loading} />}

      {/* HEADER */}
      <div className="wo-ph">
        <span className="wo-ph-title">📋 Stock Ledger</span>
        <div className="wo-ph-actions">
          <button className="btn btn-b btn-sm">
            <IoAdd size={15} /> Purchase
          </button>
        
        </div>
      </div>

      {/* SUMMARY */}
      <div className="items-mg items-mg-4">
        <div className="items-mc">
          <div className="items-mc-l">Opening</div>
          <div className="items-mc-v">
            {totalOpening.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="items-mc" style={{ "--accent": "var(--a2)" }}>
          <div className="items-mc-l">Purchases In</div>
          <div className="items-mc-v" style={{ color: "var(--a2)" }}>
            {finalItems.length || 0}
          </div>
        </div>

        <div className="items-mc" style={{ "--accent": "var(--red)" }}>
          <div className="items-mc-l">Sales Out</div>
          <div className="items-mc-v" style={{ color: "var(--red)" }}>
            {totalSold.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="items-mc" style={{ "--accent": "var(--green)" }}>
          <div className="items-mc-l">Closing Stock</div>
          <div className="items-mc-v">
            {totalClosing.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="items-filter-bar">
        <input
          className="items-inp"
          placeholder="Search name, SKU…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="items-table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Ref</th>
              <th>Type</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Value</th>
              <th>GST</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((i) => (
              <tr key={i._id}>
              <td className="items-code">
  {i.updatedAt
    ? new Date(i.updatedAt).toLocaleDateString("en-IN")
    : "-"}
</td>
                <td className="items-code">{i._id}</td>
                <td>
                  <span className="tag t-ok">{i.type}</span>
                </td>
                <td className="items-code items-bold">
                  {i.itemName}
                </td>
                <td>{i.openingStock}</td>
                <td className="items-num items-bold">
                  ₹{i.cost?.toLocaleString("en-IN") || 0}
                </td>
                <td className="items-num items-muted">
                  ₹
                  {(
                    (i.cost || 0) * (i.openingStock || 0)
                  ).toLocaleString("en-IN")}
                </td>
                <td className="items-code">{i.gst}%</td>
              </tr>
            ))}

            {!filtered.length && (
              <tr>
                <td colSpan="8" className="items-empty">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;