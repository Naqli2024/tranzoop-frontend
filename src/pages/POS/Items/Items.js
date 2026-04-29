import React, { useEffect, useMemo, useState } from "react";
import { IoAdd } from "react-icons/io5";
import AddItemsModal from "./AddItemsModal";
import { useDispatch } from "react-redux";
import {
  allItems,
  deleteItems,
  getAllItems,
} from "../../../redux/POS/ItemSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { addFavorite } from "../../../redux/POS/ItemSlice";

const Items = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [favLoadingId, setFavLoadingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const stockVal = Array.isArray(itemData)
    ? itemData.reduce((s, i) => s + (i.mrp || 0) * (i.openingStock || 0), 0)
    : 0;

  const lowStockLimit = 10;

  const lowStock = Array.isArray(itemData)
    ? itemData.filter(
        (i) =>
          i.type !== "service" &&
          i.openingStock >= 0 &&
          i.openingStock < lowStockLimit,
      ).length
    : 0;

  const outOfStock = Array.isArray(itemData)
    ? itemData.filter((i) => i.openingStock === 0).length
    : 0;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const safeItems = Array.isArray(itemData) ? itemData : [];
    return safeItems.filter(
      (item) =>
        !q ||
        item.itemName?.toLowerCase().includes(q) ||
        item.sku?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q),
    );
  }, [search, itemData]);

  const getStockTag = (i) => {
    if (i.type === "service")
      return <span className="items-tag items-grey">Service</span>;

    if (i.openingStock === 0)
      return <span className="items-tag items-err">Out</span>;

    if (i.openingStock < 10)
      return <span className="items-tag items-pend">Low</span>;

    return <span className="items-tag items-ok">OK</span>;
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await dispatch(deleteItems(deleteItemId)).unwrap();
      setItemData((prev) => prev.filter((item) => item._id !== deleteItemId));
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      setDeleteLoading(false);
      setDeleteModal(false);
      setDeleteItemId(null);
    }
  };

  const handleFavourite = async (item) => {
    try {
      const updatedValue = !item.isFavorite;
      setFavLoadingId(item._id);
      await dispatch(
        addFavorite({
          itemId: item._id,
          payload: { isFavorite: updatedValue },
        }),
      ).unwrap();
      setItemData((prev) =>
        prev.map((i) =>
          i._id === item._id ? { ...i, isFavorite: updatedValue } : i,
        ),
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setFavLoadingId(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getAllItems())
      .unwrap()
      .then((response) => {
        const items =
          response?.items ||
          response?.data?.items ||
          response?.data ||
          (Array.isArray(response) ? response : []);
        setItemData(items);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="items-wrap">
      {loading && <Loader isLoading={loading} />}
 <div className="items-wrap">
      <div className="wo-ph">
        <span className="wo-ph-title">📦 Item Master</span>
        <div className="wo-ph-actions">
          <button
            class="btn btn-p btn-sm"
            onClick={() => {
              setSelectedItem(null);
              setOpenAddItemModal(true);
            }}
          >
            <IoAdd size={15} /> Add Item
          </button>
        </div>
      </div>
      <div className="items-mg items-mg-4" style={{ flexShrink: 0 }}>
        <div className="items-mc">
          <div className="items-mc-l">Total SKUs</div>
          <div className="items-mc-v">{itemData.length}</div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--a2)" }}>
          <div className="items-mc-l">Low Stock</div>
          <div className="items-mc-v" style={{ color: "var(--a2)" }}>
            {lowStock}
          </div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--red)" }}>
          <div className="items-mc-l">Out of Stock</div>
          <div className="items-mc-v" style={{ color: "var(--red)" }}>
            {outOfStock}
          </div>
        </div>
        <div className="items-mc" style={{ "--accent": "var(--green)" }}>
          <div className="items-mc-l">Stock Value</div>
          <div className="items-mc-v">₹{(stockVal / 1000).toFixed(1)}K</div>
        </div>
      </div>

      <div class="items-filter-bar">
        <input
          class="items-inp"
          style={{ flex: "1", maxWidth: "300px" }}
          placeholder="Search name, SKU, HSN…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div class="items-table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>HSN</th>
              <th>GST%</th>
              <th>MRP</th>
              <th>Cost</th>
              <th>Margin%</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Favourite</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i._id}>
                <td className="items-name">{i.itemName}</td>
                <td className="items-code">{i.sku}</td>
                <td>{i.category}</td>
                <td className="items-code">{i.hsn}</td>
                <td>{i.gst}%</td>
                <td className="items-num items-bold">
                  ₹{i.mrp?.toLocaleString("en-IN")}
                </td>
                <td className="items-num items-muted">
                  ₹{i.cost?.toLocaleString("en-IN")}
                </td>
                <td className="items-num items-green items-bold">
                  {i.margin}%
                </td>
                <td className="items-num">{i.openingStock}</td>
                <td>{getStockTag(i)}</td>
                <td className="items-fav">
                  <span
                    style={{
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleFavourite(i)}
                  >
                    {favLoadingId === i._id ? (
                      <span className="fav-loader"></span>
                    ) : i.isFavorite ? (
                      <FaHeart color="red" />
                    ) : (
                      <CiHeart />
                    )}
                  </span>
                </td>

                <td style={{ textAlign: "center" }}>
                  <span
                    className="items-btn"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedItem(i);
                      setOpenAddItemModal(true);
                    }}
                  >
                    <MdEdit color="green" className="me-1" size={18}/>
                  </span>

                  <span
                    className="items-btn"
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setDeleteItemId(i._id);
                      setDeleteModal(true);
                    }}
                  >
                    <MdDelete color="red" size={18}/>
                  </span>
                </td>
              </tr>
            ))}

            {!filtered.length && (
              <tr> 
                <td colSpan="12" className="items-empty">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openAddItemModal && (
        <AddItemsModal
          closeModal={setOpenAddItemModal}
          editData={selectedItem}
          setItemData={setItemData}
        />
      )}

      {deleteModal && (
        <div className="delete-backdrop">
          <div className="delete-modal">
            <div className="delete-icon-wrap">
              <MdDelete className="delete-icon" />
            </div>

            <h3 className="delete-title">Delete Item?</h3>

            <p className="delete-text">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            <div className="delete-actions">
              <button
                className="delete-btn cancel"
                onClick={() => {
                  setDeleteModal(false);
                  setDeleteItemId(null);
                }}
              >
                Cancel
              </button>

              <button
                className="delete-btn confirm"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <span className="btn-loader"></span>
                ) : (
                  <>
                    <MdDelete /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
   
  );
};

export default Items;