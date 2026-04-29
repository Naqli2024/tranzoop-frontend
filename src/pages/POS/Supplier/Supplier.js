import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteSupplier, getAllSuppliers } from '../../../redux/POS/SupplierSlice';
import Loader from '../../../components/Loader';
import { IoAdd } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddSupplierModal from './AddSupplierModal';

const Supplier = () => {
  const [openNewSupplierModal, setOpenNewSupplierModal] = useState(false);
  const [openDeleteSupplierModal, setOpenDeleteSupplierModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [purchaseData, setPurchaseData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllSuppliers())
      .unwrap()
      .then((response) => {
        setSupplierData(response || []);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleDelete = async () => {
  if (!selectedSupplier) return;

  try {
    setDeleteLoading(true);
    await dispatch(deleteSupplier(selectedSupplier._id)).unwrap()
    .then((response)=>{
      toast.success(response.message);
      setOpenDeleteSupplierModal(false);
      dispatch(getAllSuppliers())
      .unwrap()
      .then((response) => {
        setSupplierData(response || []);
      })
    })
  } catch (err) {
    toast.error(err);
  } finally {
    setDeleteLoading(false);
  }
};

  return (
    <div className="purchase-container">
      <div className="purchase-container">
        {loading && <Loader isLoading={loading} />}
        <div className="wo-ph">
          <span className="wo-ph-title">🏷️ Suppliers</span>
          <div className="wo-ph-actions">
            <button class="btn btn-p btn-sm" onClick={() => setOpenNewSupplierModal(true)}>
              <IoAdd size={15} /> New Supplier
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
        </div>
        <div class="items-table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Supplier Name</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>GST Number</th>
                <th>Created Date</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.length > 0 ? (
                supplierData.filter((s) =>
                  s.name.toLowerCase().includes(search.toLowerCase())
                )
                  .map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.mobile}</td>
                      <td>{s.email}</td>
                      <td>{s.address}</td>
                      <td>{s.gstNumber}</td>
                      <td>
                        {new Date(s.createdAt).toLocaleDateString("en-GB")}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <MdEdit
                          size={18}
                          color="green"
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => {
                            setSelectedSupplier(s);
                            setOpenNewSupplierModal(true);
                          }}
                        />
                        <MdDelete
                          size={18}
                          color="red"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                              setSelectedSupplier(s);
                              setOpenDeleteSupplierModal(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="8" className="items-empty">
                    No suppliers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {openNewSupplierModal &&
        <AddSupplierModal
  closeModal={() => {
    setOpenNewSupplierModal(false);
    setSelectedSupplier(null);
  }}
  setSupplierData={setSupplierData}
  editData={selectedSupplier}
/>}
      {openDeleteSupplierModal &&
        <div className="delete-backdrop">
          <div className="delete-modal">
            <div className="delete-icon-wrap">
              <MdDelete className="delete-icon" />
            </div>

            <h3 className="delete-title">Delete Supplier?</h3>

            <p className="delete-text">
              Are you sure you want to delete this supplier? This action cannot be
              undone.
            </p>

            <div className="delete-actions">
              <button
                className="delete-btn cancel"
                onClick={() => {
                  setOpenDeleteSupplierModal(false);
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
        </div>}
    </div>
  )
}

export default Supplier