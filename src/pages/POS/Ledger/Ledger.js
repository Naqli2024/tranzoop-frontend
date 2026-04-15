import React, { useState } from 'react';
import { IoAdd } from "react-icons/io5";

const PL_TABS = [
  { id: 'report', label: '📊 P&L Statement' },
  { id: 'vouchers', label: '📋 Vouchers' },
  { id: 'coa', label: '🗂 Chart of Accounts' },
  { id: 'brand', label: '🏷 Brand Analysis' },
  { id: 'segment', label: '🚗 Segment P&L' },
  { id: 'comp', label: '📈 Comparison' },
];
 
const PL_DATA = {
  income: { label: 'Income', total: 1022800, ledgers: [
    { name: 'Tyre Sales', amount: 780000 },
    { name: 'Service Revenue', amount: 162800 },
    { name: 'Battery Sales', amount: 80000 },
  ]},
  cogs: { label: 'Cost of Goods Sold', total: 680000, ledgers: [
    { name: 'Purchase — Tyres', amount: 520000 },
    { name: 'Purchase — Battery', amount: 58000 },
    { name: 'Purchase — Consumables', amount: 102000 },
  ]},
  expenses: { label: 'Indirect Expenses', total: 124000, ledgers: [
    { name: 'Rent', amount: 30000 },
    { name: 'Salaries', amount: 72000 },
    { name: 'Electricity', amount: 12000 },
    { name: 'Misc', amount: 10000 },
  ]},
};
 
const grossProfit = PL_DATA.income.total - PL_DATA.cogs.total;
const netProfit = grossProfit - PL_DATA.expenses.total;
const gpPct = ((grossProfit / PL_DATA.income.total) * 100).toFixed(1);
const npPct = ((netProfit / PL_DATA.income.total) * 100).toFixed(1);
 
const VOUCHERS = [
  { type: 'payment', icon: '💸', title: 'Rent Payment — April', ref: 'PMT-26-042', dr: 30000, cr: 0, date: '01 Apr' },
  { type: 'receipt', icon: '💰', title: 'Cash Receipt — Ravi Kumar', ref: 'RCT-26-041', dr: 0, cr: 9400, date: '13 Apr' },
  { type: 'purchase', icon: '📦', title: 'Purchase — Arjun Motors', ref: 'PUR-26-018', dr: 21000, cr: 0, date: '13 Apr' },
  { type: 'sales', icon: '🧾', title: 'Sales Invoice — INV-26-042', ref: 'SAL-26-042', dr: 0, cr: 9400, date: '13 Apr' },
  { type: 'journal', icon: '📓', title: 'Depreciation Entry', ref: 'JNL-26-010', dr: 5000, cr: 5000, date: '10 Apr' },
];
 
const COA_GROUPS = [
  { name: 'Assets', color: '#3B82F6', ledgers: ['Cash in Hand', 'Bank — HDFC', 'Accounts Receivable', 'Stock / Inventory'] },
  { name: 'Liabilities', color: '#EF4444', ledgers: ['Accounts Payable', 'GST Payable', 'Loan — HDFC Bank'] },
  { name: 'Income', color: '#10B981', ledgers: ['Tyre Sales', 'Service Revenue', 'Battery Sales'] },
  { name: 'Expenses', color: '#F59E0B', ledgers: ['Purchases', 'Rent', 'Salaries', 'Electricity'] },
];
 
const vTypeClass = (t) => ({ payment: 'v-pmt', receipt: 'v-rcpt', journal: 'v-jnl', purchase: 'v-pur', sales: 'v-sal', contra: 'v-ctr' }[t] || '');
 
export default function Ledger() {
  const [activeTab, setActiveTab] = useState('report');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
 
  return (
    <div className="pl-wrap">
       <div className="wo-ph">
              <span className="wo-ph-title">
                💰 Accounting — P&L, Vouchers & Ledgers
              </span>
              <div className="wo-ph-actions">
                <select className="sel">
            <option value="apr26">April 2026</option>
            <option value="mar26">March 2026</option>
            <option value="fy26">FY 2025-26</option>
            <option value="q4">Q4 Jan-Mar 2026</option>
          </select>
                  <button class="btn btn-b btn-sm">Export</button>
                  <button class="btn btn-p btn-sm"><IoAdd size={15} /> Voucher</button>
              </div>
            </div>
 
      <div className="pl-tab-strip">
        {PL_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`pl-tab${activeTab === tab.id ? ' act' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
 
      {/* P&L Statement */}
      {activeTab === 'report' && (
        <div className="pl-tab-body" style={{ overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: 10, padding: 12, flexShrink: 0, flexWrap: 'wrap' }}>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Gross Revenue</div>
              <div className="pl-mc-v">₹{(PL_DATA.income.total / 100000).toFixed(2)}L</div>
              <div className="pl-mc-h up">All income</div>
            </div>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Gross Profit</div>
              <div className="pl-mc-v">₹{(grossProfit / 100000).toFixed(2)}L</div>
              <div className="pl-mc-h up">{gpPct}% GP</div>
            </div>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Net Profit</div>
              <div className="pl-mc-v">₹{(netProfit / 100000).toFixed(2)}L</div>
              <div className="pl-mc-h up">{npPct}% NP</div>
            </div>
            <div className="pl-mc" style={{ flex: 1, minWidth: 120 }}>
              <div className="pl-mc-l">Total Expenses</div>
              <div className="pl-mc-v">₹{(PL_DATA.expenses.total / 100000).toFixed(2)}L</div>
              <div className="pl-mc-h" style={{ color: 'var(--muted)' }}>Indirect</div>
            </div>
            <div className="insight-box" style={{ flex: 1.5, minWidth: 200 }}>
              <div className="insight-title">🤖 AI Insights</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>
                ✅ NP margin of {npPct}% is above industry avg of 12%<br />
                ⚠ Tyre sales down 8% vs last month — check procurement
              </div>
            </div>
          </div>
 
          <div style={{ padding: '0 14px 60px' }}>
            {Object.entries(PL_DATA).map(([key, section]) => (
              <div key={key} className="pl-section">
                <div className={`pl-section-hdr pl-hdr-${key}`}>{section.label} — ₹{section.total.toLocaleString('en-IN')}</div>
                <div className="pl-body">
                  {section.ledgers.map((l) => (
                    <div key={l.name} className="srow">
                      <span className="sk">{l.name}</span>
                      <span className="sv num">₹{l.amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
 
            <div className="pl-section">
              <div className="pl-section-hdr pl-hdr-net">
                Net Profit — ₹{netProfit.toLocaleString('en-IN')} ({npPct}%)
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* Vouchers */}
      {activeTab === 'vouchers' && (
        <div className="pl-tab-body">
          <div style={{ padding: '8px 12px', display: 'flex', gap: 7, flexShrink: 0, borderBottom: '1px solid var(--border)', background: 'var(--bg)', flexWrap: 'wrap' }}>
            <select className="sel">
              <option value="">All Types</option>
              <option>payment</option>
              <option>receipt</option>
              <option>journal</option>
              <option>purchase</option>
              <option>sales</option>
            </select>
            <input className="inp" placeholder="Search narration, ref…" style={{ flex: 1, minWidth: 160, fontSize: 11 }} />
            <button className="btn btn-sm">Refresh</button>
          </div>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <div style={{ flex: 1, overflowY: 'auto', borderRight: '1px solid var(--border)' }}>
              {VOUCHERS.map((v) => (
                <div
                  key={v.ref}
                  className="v-row"
                  style={{ background: selectedVoucher?.ref === v.ref ? 'rgba(255,255,255,0.03)' : '' }}
                  onClick={() => setSelectedVoucher(v)}
                >
                  <div className={`v-badge ${vTypeClass(v.type)}`}>{v.icon}</div>
                  <div className="v-info">
                    <div className="v-title">{v.title}</div>
                    <div className="v-sub">{v.ref} · {v.date}</div>
                  </div>
                  {v.dr > 0 && <span className="v-amt-dr">−₹{v.dr.toLocaleString('en-IN')}</span>}
                  {v.cr > 0 && <span className="v-amt-cr">+₹{v.cr.toLocaleString('en-IN')}</span>}
                </div>
              ))}
            </div>
            <div style={{ width: 320, overflowY: 'auto', padding: 14, background: 'var(--surface)', flexShrink: 0 }}>
              {selectedVoucher ? (
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 10 }}>{selectedVoucher.title}</div>
                  <div className="srow"><span className="sk">Ref</span><span className="sv code">{selectedVoucher.ref}</span></div>
                  <div className="srow"><span className="sk">Date</span><span className="sv">{selectedVoucher.date}</span></div>
                  <div className="srow"><span className="sk">Type</span><span className={`tag ${vTypeClass(selectedVoucher.type)}`}>{selectedVoucher.type}</span></div>
                  {selectedVoucher.dr > 0 && <div className="srow"><span className="sk">Debit</span><span className="v-amt-dr">₹{selectedVoucher.dr.toLocaleString('en-IN')}</span></div>}
                  {selectedVoucher.cr > 0 && <div className="srow"><span className="sk">Credit</span><span className="v-amt-cr">₹{selectedVoucher.cr.toLocaleString('en-IN')}</span></div>}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--muted)', fontSize: 12, opacity: 0.5 }}>← Select a voucher</div>
              )}
            </div>
          </div>
        </div>
      )}
 
      {/* Chart of Accounts */}
      {activeTab === 'coa' && (
        <div className="pl-tab-body">
          <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>Double-entry Tally-style COA</span>
            <button className="btn btn-sm btn-p" style={{ marginLeft: 'auto' }}>+ New Ledger</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 14, overflowY: 'auto', flex: 1, paddingBottom: 60 }}>
            {COA_GROUPS.map((grp) => (
              <div key={grp.name} className="card">
                <div className="coa-grp-hdr" style={{ background: `${grp.color}18`, color: grp.color }}>
                  {grp.name}
                </div>
                {grp.ledgers.map((ledger) => (
                  <div key={ledger} className="coa-item">
                    <span>{ledger}</span>
                    <span className="coa-balance" style={{ color: 'var(--muted)' }}>₹—</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
 
      {/* Brand Analysis */}
      {activeTab === 'brand' && (
        <div className="pl-tab-body" style={{ overflowY: 'auto' }}>
          <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 60 }}>
            <div className="card">
              <div className="card-hdr">Brand-wise Profit Analysis</div>
              <div className="tc">
                <table>
                  <thead>
                    <tr><th>Brand</th><th>Revenue</th><th>COGS</th><th>Gross Profit</th><th>Margin%</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ['MRF', '₹3,12,000', '₹2,06,000', '₹1,06,000', '34%'],
                      ['Apollo', '₹1,86,000', '₹1,28,000', '₹58,000', '31%'],
                      ['Bridgestone', '₹1,56,000', '₹1,10,000', '₹46,000', '29%'],
                      ['Amaron', '₹80,000', '₹58,000', '₹22,000', '27%'],
                    ].map(([brand, rev, cogs, gp, margin]) => (
                      <tr key={brand}>
                        <td style={{ fontWeight: 700 }}>{brand}</td>
                        <td className="num">{rev}</td>
                        <td className="num">{cogs}</td>
                        <td className="num" style={{ color: 'var(--green)' }}>{gp}</td>
                        <td className="num">{margin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* Segment P&L */}
      {activeTab === 'segment' && (
        <div className="pl-tab-body" style={{ overflowY: 'auto' }}>
          <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 60 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="card">
                <div className="card-hdr">Vehicle Segment P&L</div>
                {[
                  ['2-Wheeler', '₹1,24,000', '18%'],
                  ['Passenger Car', '₹5,82,000', '34%'],
                  ['SUV / MUV', '₹2,12,000', '29%'],
                  ['Commercial', '₹1,04,800', '22%'],
                ].map(([seg, rev, margin]) => (
                  <div key={seg} className="srow">
                    <span className="sk">{seg}</span>
                    <span className="sv num">{rev}</span>
                    <span style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700 }}>{margin}</span>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="card-hdr">Service vs Product</div>
                {[
                  ['Product Sales', '₹8,60,000', '84%'],
                  ['Services', '₹1,62,800', '16%'],
                ].map(([label, val, pct]) => (
                  <div key={label} className="srow">
                    <span className="sk">{label}</span>
                    <span className="sv num">{val}</span>
                    <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* Comparison */}
      {activeTab === 'comp' && (
        <div className="pl-tab-body" style={{ overflowY: 'auto' }}>
          <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 60 }}>
            <div className="card">
              <div className="card-hdr">Month-on-Month: Revenue, GP & NP</div>
              {[
                ['Nov', 8.2, 2.8, 1.6],
                ['Dec', 9.4, 3.2, 1.9],
                ['Jan', 8.8, 3.0, 1.7],
                ['Feb', 7.6, 2.6, 1.4],
                ['Mar', 10.1, 3.5, 2.1],
                ['Apr', 10.2, 3.4, 2.2],
              ].map(([month, rev, gp, np]) => (
                <div key={month} className="comp-row">
                  <span className="comp-lbl">{month}</span>
                  <div className="comp-bar-wrap">
                    <div className="comp-bar">
                      <div className="comp-fill" style={{ width: `${(rev / 12) * 100}%`, background: '#3B82F6' }} />
                    </div>
                    <div className="comp-bar">
                      <div className="comp-fill" style={{ width: `${(gp / 12) * 100}%`, background: '#10B981' }} />
                    </div>
                  </div>
                  <div className="comp-vals">
                    <span><span className="comp-dot" style={{ background: '#3B82F6' }} />₹{rev}L</span>
                    <span><span className="comp-dot" style={{ background: '#10B981' }} />₹{gp}L</span>
                    <span style={{ color: 'var(--accent)' }}>₹{np}L NP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}