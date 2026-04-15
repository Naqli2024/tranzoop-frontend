import React from "react";

const GST = () => {
  return (
    <div className="gst-container">
      <div className="wo-ph">
        <span className="wo-ph-title">🛡 GST Filing & Compliance</span>
      </div>
      <div class="scroll-pnl">
          <div className="gst-card-grid">
            <div class="card">
              <div class="card-hdr">Outward Supplies</div>
              <div class="srow"><span class="sk">B2B Taxable</span><span class="sv num">₹8,12,000</span></div>
              <div class="srow"><span class="sk">B2C Taxable</span><span class="sv num">₹2,10,800</span></div>
              <div class="srow"><span class="sk">CGST</span><span class="sv" style={{color:"var(--accent)"}}>₹91,260</span></div>
              <div class="srow"><span class="sk">SGST</span><span class="sv" style={{color:"var(--accent)"}}>₹91,260</span></div>
            </div>
            <div class="card">
              <div class="card-hdr">Input Tax Credit</div>
              <div class="srow"><span class="sk">Eligible ITC (CGST)</span><span class="sv" style={{color:"var(--green)"}}>₹56,200</span></div>
              <div class="srow"><span class="sk">Eligible ITC (SGST)</span><span class="sv" style={{color:"var(--green)"}}>₹56,200</span></div>
              <div class="srow"><span class="sk">Net ITC</span><span class="sv" style={{color:"var(--green)"}}>₹1,12,400</span></div>
            </div>
            <div class="card"><div class="card-hdr">Net Payable</div>
              <div class="srow"><span class="sk">Total Liability</span><span class="sv">₹1,95,210</span></div>
              <div class="srow"><span class="sk">Less ITC</span><span class="sv" style={{color:"var(--green)"}}>−₹1,12,400</span></div>
              <div class="srow"><span class="sk">Cash Payable</span><span class="sv" style={{color:"var(--accent)",fontSize:"15px"}}>₹70,120</span></div>
              <button class="btn btn-p btn-sm" style={{width:"100%",marginTop:"8px"}}>Generate GSTR-3B →</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default GST;
