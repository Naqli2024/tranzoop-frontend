import React, { useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";

const CustomerLedgerDetails = ({ customerDetails, setCustomerDetails }) => {
    const [dateFilter, setDateFilter] = useState("ALL");

    const isInRange = (date, filter) => {
        const d = new Date(date);
        const today = new Date();

        if (filter === "TODAY") {
            return d.toDateString() === today.toDateString();
        }

        if (filter === "WEEK") {
            const firstDay = new Date(today);
            firstDay.setDate(today.getDate() - today.getDay());

            const lastDay = new Date(firstDay);
            lastDay.setDate(firstDay.getDate() + 6);

            return d >= firstDay && d <= lastDay;
        }

        if (filter === "MONTH") {
            return (
                d.getMonth() === today.getMonth() &&
                d.getFullYear() === today.getFullYear()
            );
        }

        if (filter === "YEAR") {
            return d.getFullYear() === today.getFullYear();
        }

        return true;
    };

    const filteredLedger = customerDetails?.ledger?.filter((row) =>
        isInRange(row.date, dateFilter)
    );

    return (
        <div>
            <div className="ledger-customer-header">
                <div>
                    <h3><span onClick={() => setCustomerDetails(null)}>
                        <IoArrowBackOutline className='me-2' size={18} cursor={'pointer'} /></span>
                        {customerDetails.customerName}</h3>
                    <p>Total Balance: ₹
                        {customerDetails.totalBalance?.toLocaleString("en-IN")}
                    </p>
                </div>
                <div className="ledger-header-filters">
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="ALL">All</option>
                        <option value="TODAY">Today</option>
                        <option value="WEEK">This Week</option>
                        <option value="MONTH">This Month</option>
                        <option value="YEAR">This Year</option>
                    </select>
                </div>
            </div>
            <div className="ledger-grid">
                {filteredLedger?.map((row, i) => (
                    <div key={i} className="ledger-card">
                        <div className="ledger-card-top">
                            <span className={`ledger-tag ${row.type === "BILL" ? "bill" : "pay"}`}>
                                {row.type}
                            </span>
                            <span className="ledger-date">
                                {new Date(row.date).toLocaleDateString("en-GB")}
                            </span>
                        </div>
                        <div className="ledger-amounts">
                            <div>
                                <small>Payment Mode</small>
                                <p className="ledger-ref">
                                    {row.ref || '_'}
                                </p>
                            </div>
                            <div>
                                <small>Debit</small>
                                <p className="ledger-debit">
                                    {row.debit ? `₹${row.debit}` : "0"}
                                </p>
                            </div>
                            <div>
                                <small>Credit</small>
                                <p className="ledger-credit">
                                    {row.credit ? `₹${row.credit}` : "0"}
                                </p>
                            </div>
                            <div>
                                <small>Balance</small>
                                <p className="ledger-balance">
                                    ₹{row.balance?.toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomerLedgerDetails