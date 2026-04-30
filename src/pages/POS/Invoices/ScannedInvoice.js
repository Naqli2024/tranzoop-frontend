import React, { useEffect, useState } from 'react'
import InvoiceModal from '../Payments/InvoiceModal'
import { getInvoiceByBillNo } from '../../../redux/POS/BillSlice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ScannedInvoice = () => {
  const dispatch = useDispatch();
  const { invNo } = useParams(); 

  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!invNo) return;
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const res = await dispatch(
          getInvoiceByBillNo({ billNo: invNo })
        ).unwrap();
        setInvoiceData(res.data.invoice);
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [dispatch, invNo])

  return (
    <div>
         <InvoiceModal invoiceNo={invoiceData?.billNo}/>
    </div>
  )
}

export default ScannedInvoice