import React from 'react';
 
const KPI_DATA = [
  { label: 'Today Sales', value: '₹28,400', change: '+12%', trend: 'up' },
  { label: 'Open WOs', value: '7', change: '3 urgent', trend: 'warn' },
  { label: 'Customers', value: '142', change: '+5 today', trend: 'up' },
  { label: 'Stock Value', value: '₹4.2L', change: '8 low stock', trend: 'dn' },
];
 
const RECENT_SALES = [
  { inv: 'INV-26-00042', customer: 'Ravi Kumar', amount: 9400, mode: 'UPI', time: '11:32 AM' },
  { inv: 'INV-26-00041', customer: 'Meena S', amount: 1200, mode: 'Cash', time: '10:58 AM' },
  { inv: 'INV-26-00040', customer: 'Arjun M', amount: 14600, mode: 'Card', time: '10:15 AM' },
  { inv: 'INV-26-00039', customer: 'Walk-in', amount: 480, mode: 'Cash', time: '09:44 AM' },
];
 
const TOP_ITEMS = [
  { name: 'MRF ZVTS 185/65R15', qty: 12, revenue: '₹50,400' },
  { name: 'Wheel Alignment Service', qty: 28, revenue: '₹16,800' },
  { name: 'Castrol GTX 10W30', qty: 36, revenue: '₹17,280' },
  { name: 'Apollo Amazer 175/70R13', qty: 9, revenue: '₹27,900' },
];

const Dashboard = () => {
  return (
    <div class="dash-wrap">
       <div className="wo-ph">
        <span className="wo-ph-title">
          📊 Dashboard <span className="wo-ph-badge">LIVE</span>
        </span>

        <div className="wo-ph-actions">
          <select className="sel">
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>
  <div class="dash-stats">
    <div class="dash-card wo-mc-pending">
      <div class="dash-card-title">REVENUE TODAY</div>
      <div class="dash-card-value">₹1,24,800</div>
      <div class="dash-card-sub up">↑ 8.4%</div>
    </div>

    <div class="dash-card wo-mc-progress">
      <div class="dash-card-title">GROSS PROFIT</div>
      <div class="dash-card-value green">₹31,200</div>
      <div class="dash-card-sub">25% margin</div>
    </div>

    <div class="dash-card wo-mc-qc">
      <div class="dash-card-title">GST COLLECTED</div>
      <div class="dash-card-value">₹22,464</div>
      <div class="dash-card-sub">CGST+SGST</div>
    </div>

    <div class="dash-card wo-mc-done">
      <div class="dash-card-title">WORK ORDERS TODAY</div>
      <div class="dash-card-value blue">4</div>
      <div class="dash-card-sub up">↑ 1</div>
    </div>
  </div>


  <div class="dash-grid">
    <div class="dash-left">
      <div class="dash-panel">
        <div class="dash-panel-title">HOURLY SALES (₹)</div>
        <div class="dash-chart">
          <div class="dash-bar" style={{height:"20%"}}></div>
          <div class="dash-bar" style={{height:"40%"}} ></div>
          <div class="dash-bar" style={{height:"60%"}}></div>
          <div class="dash-bar" style={{height:"50%"}}></div>
          <div class="dash-bar" style={{height:"80%"}}></div>
          <div class="dash-bar active" style={{height:"90%"}}></div>
          <div class="dash-bar" style={{height:"70%"}}></div>
          <div class="dash-bar" style={{height:"55%"}}></div>
        </div>
      </div>

      <div class="dash-panel">
        <div class="dash-panel-title">TOP 5 PRODUCTS</div>
        <div class="dash-list">
          <div class="dash-row">
            <span>MRF Zapper X 90/90-10</span>
            <span>₹1,800</span>
          </div>
          <div class="dash-progress"><div style={{width:"90%"}}></div></div>
          <div class="dash-row">
            <span>Apollo Amazer 185/65 R15</span>
            <span>₹5,200</span>
          </div>
          <div class="dash-progress"><div style={{width:"75%"}}></div></div>

          <div class="dash-row">
            <span>CEAT Milaze X3</span>
            <span>₹2,400</span>
          </div>
          <div class="dash-progress"><div style={{width:"60%"}}></div></div>
        </div>
      </div>

    </div>


    <div class="dash-right">
      <div class="dash-panel">
        <div class="dash-panel-title">GST SUMMARY</div>
        <div class="dash-gst">
          <div class="dash-gst-card">CGST<br/><b>₹11,232</b></div>
          <div class="dash-gst-card">SGST<br/><b>₹11,232</b></div>
          <div class="dash-gst-card red">Net Pay<br/><b>₹70,120</b></div>
          <div class="dash-gst-card green">ITC<br/><b>₹56,200</b></div>
        </div>
      </div>

      <div class="dash-panel">
        <div class="dash-panel-title">STOCK ALERTS</div>
        <div class="dash-stock">
          <span>⚠ Flap 10.00-20</span>
          <span class="dash-badge">3 left</span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
export default Dashboard