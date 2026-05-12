import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../../../helpers/ThemeContext';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LandingPage = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigateTo = useNavigate();

  useEffect(() => {
// ─── SCROLL REVEAL
    const reveals = document.querySelectorAll(".landing-home-reveal");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("landing-home-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    // ─── ANIMATE BAR CHART 
    const bcols = document.querySelectorAll(
      ".landing-home-bcol:not(.landing-home-bcol-active)"
    );

    const interval = setInterval(() => {
      bcols.forEach((b) => {
        b.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
      });
    }, 1800);

    // ─── CLEANUP
    return () => {
      revealObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='landing-page-overall-container'>
  <nav class="landing-home-nav">
    <a href="#" class="landing-home-logo">Tranzoop<sup>BOS</sup></a>

    <ul class="landing-home-nav-links">
      <li><a href="#features">Platform</a></li>
      <li><a href="#business">Solutions</a></li>
      <li><a href="#process">How It Works</a></li>
      <li><a href="#about">Company</a></li>
    </ul>

    <div class="landing-home-nav-right">
      <div className="landing-dark-light-theme-toggle">
            <div
              className={`landing-dark-light-theme-btn ${
                theme === "dark" ? "active" : ""
              }`}
              onClick={toggleTheme}
            >
              <MdOutlineDarkMode />
            </div>
            <div
              className={`landing-dark-light-theme-btn ${
                theme === "light" ? "active" : ""
              }`}
              onClick={toggleTheme}
            >
              <MdOutlineLightMode />
            </div>
          </div>
      <a class="landing-home-nav-cta" href="#waitlist">Request Access</a>
    </div>
  </nav>


  <section class="landing-home-hero">
    <div class="landing-home-hero-rule"></div>
    <div class="landing-home-hero-left">
      <div class="landing-home-hero-eyebrow">
        <div class="landing-home-eyebrow-line"></div>
        <span class="landing-home-eyebrow-text">Launching 2025 · All Business Types</span>
      </div>
      <h1 class="landing-home-hero-title">
        The Business<br/>
        Operating<br/>
        System for<br/>
        <span class="landing-home-title-italic">Every Enterprise.</span>
      </h1>
      <p class="landing-home-hero-sub">
        Tranzoop unifies payments, inventory, staff, analytics, and customer management
        into one intelligent platform — purpose-built for the way modern businesses operate.
      </p>
      <div class="landing-home-hero-actions">
        <a href="#waitlist" class="landing-home-btn-primary">Join the Waitlist</a>
        <a  class="landing-home-btn-outline" onClick={()=> navigateTo('/platform')}>Explore Platform →</a>
      </div>
      <div class="landing-home-hero-divider"></div>
      <div class="landing-home-hero-stats">
        <div class="landing-home-stat-item">
          <div class="landing-home-stat-num">10+</div>
          <div class="landing-home-stat-label">Industries</div>
        </div>
        <div class="landing-home-stat-item">
          <div class="landing-home-stat-num">1</div>
          <div class="landing-home-stat-label">Unified App</div>
        </div>
        <div class="landing-home-stat-item">
          <div class="landing-home-stat-num">24/7</div>
          <div class="landing-home-stat-label">Live Insights</div>
        </div>
      </div>
    </div>
    <div class="landing-home-hero-right">
      <div style={{position:"relative"}}>
        <div class="landing-home-desktop-mockup">
          <div class="landing-home-window-bar">
            <div class="landing-home-window-dots">
              <div class="landing-home-dot landing-home-dot-r"></div>
              <div class="landing-home-dot landing-home-dot-y"></div>
              <div class="landing-home-dot landing-home-dot-g"></div>
            </div>
            <span class="landing-home-window-title">Tranzoop — Business Overview</span>
            <div class="landing-home-window-live">
              <div class="landing-home-live-dot"></div>
              Live
            </div>
          </div>
          <div class="landing-home-desktop-body">
            <aside class="landing-home-desk-sidebar">
              <div class="landing-home-desk-logo">TZ</div>
              <nav class="landing-home-desk-nav">
                <div class="landing-home-desk-nav-item landing-home-desk-nav-active" title="Dashboard">📊</div>
                <div class="landing-home-desk-nav-item" title="Orders">📦</div>
                <div class="landing-home-desk-nav-item" title="Customers">👥</div>
                <div class="landing-home-desk-nav-item" title="Finance">💳</div>
                <div class="landing-home-desk-nav-item" title="Analytics">📈</div>
              </nav>
            </aside>

            <div class="landing-home-desk-main">
              <div class="landing-home-desk-topbar">
                <div>
                  <div class="landing-home-desk-page-title">Dashboard</div>
                  <div class="landing-home-desk-page-sub">May 2025 · Real-time</div>
                </div>
                <div class="landing-home-desk-topbar-right">
                  <div class="landing-home-desk-online">
                    <div class="landing-home-live-dot"></div>
                    Live
                  </div>
                  <div class="landing-home-desk-avatar">AR</div>
                </div>
              </div>
              <div class="landing-home-desk-kpi-row">
                <div class="landing-home-desk-kpi">
                  <div class="landing-home-desk-kpi-label">Revenue</div>
                  <div class="landing-home-desk-kpi-val">$84.3K</div>
                  <div class="landing-home-desk-kpi-delta landing-home-delta-green">↑ 22.4%</div>
                </div>
                <div class="landing-home-desk-kpi">
                  <div class="landing-home-desk-kpi-label">Orders</div>
                  <div class="landing-home-desk-kpi-val">1,248</div>
                  <div class="landing-home-desk-kpi-delta landing-home-delta-green">↑ 14%</div>
                </div>
                <div class="landing-home-desk-kpi">
                  <div class="landing-home-desk-kpi-label">Avg Value</div>
                  <div class="landing-home-desk-kpi-val landing-home-desk-kpi-gold">$67.6</div>
                  <div class="landing-home-desk-kpi-delta landing-home-delta-gold">Top metric</div>
                </div>
                <div class="landing-home-desk-kpi">
                  <div class="landing-home-desk-kpi-label">Satisfaction</div>
                  <div class="landing-home-desk-kpi-val landing-home-desk-kpi-green">96%</div>
                  <div class="landing-home-desk-kpi-delta landing-home-delta-green">Excellent</div>
                </div>
              </div>
              <div class="landing-home-desk-panels">
                <div class="landing-home-desk-chart-panel">
                  <div class="landing-home-desk-panel-title">Revenue Analytics</div>
                  <div class="landing-home-bar-chart landing-home-desk-chart">
                    <div class="landing-home-bcol" style={{height:"45%"}}></div>
                    <div class="landing-home-bcol" style={{height:"62%"}}></div>
                    <div class="landing-home-bcol" style={{height:"50%"}}></div>
                    <div class="landing-home-bcol" style={{height:"78%"}}></div>
                    <div class="landing-home-bcol" style={{height:"58%"}}></div>
                    <div class="landing-home-bcol" style={{height:"85%"}}></div>
                    <div class="landing-home-bcol landing-home-bcol-active" style={{height:"100%"}}></div>
                  </div>
                  <div class="landing-home-bar-labels">
                    <div class="landing-home-blabel">MON</div>
                    <div class="landing-home-blabel">TUE</div>
                    <div class="landing-home-blabel">WED</div>
                    <div class="landing-home-blabel">THU</div>
                    <div class="landing-home-blabel">FRI</div>
                    <div class="landing-home-blabel">SAT</div>
                    <div class="landing-home-blabel">SUN</div>
                  </div>
                </div>
                <div class="landing-home-desk-activity-panel">
                  <div class="landing-home-desk-panel-title">Recent Activity</div>
                  <div class="landing-home-order-item">
                    <span class="landing-home-order-name">Table 12</span>
                    <span class="landing-home-order-status landing-home-status-green">Served</span>
                    <span class="landing-home-order-val">$148</span>
                  </div>
                  <div class="landing-home-order-item">
                    <span class="landing-home-order-name">Order #5821</span>
                    <span class="landing-home-order-status landing-home-status-amber">Pending</span>
                    <span class="landing-home-order-val">$93</span>
                  </div>
                  <div class="landing-home-order-item">
                    <span class="landing-home-order-name">INV-0284</span>
                    <span class="landing-home-order-status landing-home-status-blue">Sent</span>
                    <span class="landing-home-order-val">$520</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="landing-home-float-badge">
          <div class="landing-home-badge-icon">📈</div>
          <div class="landing-home-badge-text">
            <div class="landing-home-badge-title">Revenue up 22%</div>
            <div class="landing-home-badge-sub">Best week this quarter</div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <div class="landing-home-marquee-section">
    <div class="landing-home-marquee-track">
      <div class="landing-home-marquee-item">Point of Sale <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Inventory Control <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Staff &amp; Payroll <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Customer CRM <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Revenue Analytics <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Invoice &amp; Billing <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Order Management <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Business Intelligence <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Point of Sale <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Inventory Control <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Staff &amp; Payroll <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Customer CRM <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Revenue Analytics <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Invoice &amp; Billing <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Order Management <span class="landing-home-marquee-sep">◆</span></div>
      <div class="landing-home-marquee-item">Business Intelligence <span class="landing-home-marquee-sep">◆</span></div>
    </div>
  </div>

  <section class="landing-home-features" id="features">
    <div class="landing-home-features-header landing-home-reveal">
      <div>
        <div class="landing-home-section-eyebrow">
          <div class="landing-home-ey-line"></div>
          <span class="landing-home-ey-text">Platform Capabilities</span>
        </div>
        <h2 class="landing-home-section-title">Engineered for<br/><em>operational excellence.</em></h2>
      </div>
      <p class="landing-home-features-desc">
        Every Tranzoop feature is designed with <strong>real business owners</strong> in mind.
        From first transaction to full enterprise scale — it grows with you.
      </p>
    </div>

    <div class="landing-home-features-grid">
      <div class="landing-home-feature-card landing-home-reveal">
        <div class="landing-home-feature-num">I.</div>
        <div class="landing-home-feature-icon-wrap">⚡</div>
        <div class="landing-home-feature-name">Point of Sale</div>
        <p class="landing-home-feature-text">Lightning-fast checkout on any device. Accept every payment method, apply discounts, and issue receipts — all in under ten seconds.</p>
      </div>
      <div class="landing-home-feature-card landing-home-reveal landing-home-rv1">
        <div class="landing-home-feature-num">II.</div>
        <div class="landing-home-feature-icon-wrap">📦</div>
        <div class="landing-home-feature-name">Smart Inventory</div>
        <p class="landing-home-feature-text">Real-time stock tracking across locations. Automated low-stock alerts and purchase orders keep your shelves perpetually ready.</p>
      </div>
      <div class="landing-home-feature-card landing-home-reveal landing-home-rv2">
        <div class="landing-home-feature-num">III.</div>
        <div class="landing-home-feature-icon-wrap">👥</div>
        <div class="landing-home-feature-name">Workforce Management</div>
        <p class="landing-home-feature-text">Schedule shifts, track attendance, manage commissions, and process payroll — your entire team, organized and accountable.</p>
      </div>
      <div class="landing-home-feature-card landing-home-reveal">
        <div class="landing-home-feature-num">IV.</div>
        <div class="landing-home-feature-icon-wrap">📊</div>
        <div class="landing-home-feature-name">Business Intelligence</div>
        <p class="landing-home-feature-text">Live dashboards reveal revenue trends, peak hours, best-selling products, and margin performance with executive-grade clarity.</p>
      </div>
      <div class="landing-home-feature-card landing-home-reveal landing-home-rv1">
        <div class="landing-home-feature-num">V.</div>
        <div class="landing-home-feature-icon-wrap">🤝</div>
        <div class="landing-home-feature-name">Customer Relations</div>
        <p class="landing-home-feature-text">Build loyalty with full purchase histories, targeted campaigns, and automated follow-ups that keep your best customers returning.</p>
      </div>
      <div class="landing-home-feature-card landing-home-reveal landing-home-rv2">
        <div class="landing-home-feature-num">VI.</div>
        <div class="landing-home-feature-icon-wrap">🧾</div>
        <div class="landing-home-feature-name">Invoicing &amp; Finance</div>
        <p class="landing-home-feature-text">Generate professional invoices in seconds. Automate payment reminders and reconcile accounts without the administrative burden.</p>
      </div>
    </div>
  </section>


  <section class="landing-home-biz-section" id="business">
    <div class="landing-home-biz-header landing-home-reveal">
      <div>
        <div class="landing-home-section-eyebrow">
          <div class="landing-home-ey-line"></div>
          <span class="landing-home-ey-text">Industry Solutions</span>
        </div>
        <h2 class="landing-home-section-title">Built for <em>your</em><br/>business sector.</h2>
      </div>
      <p class="landing-home-biz-header-right">
        Whether you operate a single storefront or a multi-location enterprise, Tranzoop adapts
        to the unique workflows and demands of your industry.
      </p>
    </div>

    <div class="landing-home-biz-grid">
      <div class="landing-home-biz-card landing-home-reveal" data-idx="01">
        <span class="landing-home-biz-icon">🛍️</span>
        <div class="landing-home-biz-name">Retail &amp; Commerce</div>
        <p class="landing-home-biz-desc">Multi-location inventory, loyalty programmes, and POS built for high-volume product retail.</p>
      </div>
      <div class="landing-home-biz-card landing-home-reveal landing-home-rv1" data-idx="02">
        <span class="landing-home-biz-icon">🍽️</span>
        <div class="landing-home-biz-name">Restaurants &amp; Hospitality</div>
        <p class="landing-home-biz-desc">Table management, kitchen display, split billing — every tool a food business requires.</p>
      </div>
      <div class="landing-home-biz-card landing-home-reveal landing-home-rv2" data-idx="03">
        <span class="landing-home-biz-icon">💈</span>
        <div class="landing-home-biz-name">Salons &amp; Wellness Spas</div>
        <p class="landing-home-biz-desc">Appointment scheduling, staff commissions, and complete client profile management.</p>
      </div>
      <div class="landing-home-biz-card landing-home-reveal landing-home-rv3" data-idx="04">
        <span class="landing-home-biz-icon">🔧</span>
        <div class="landing-home-biz-name">Field Services</div>
        <p class="landing-home-biz-desc">Job tracking, estimates, invoicing, and mobile team management — fully integrated.</p>
      </div>
      <div class="landing-home-biz-card landing-home-reveal" data-idx="05">
        <span class="landing-home-biz-icon">🏥</span>
        <div class="landing-home-biz-name">Healthcare &amp; Clinics</div>
        <p class="landing-home-biz-desc">Patient records, appointment booking, and compliant billing for medical practices.</p>
      </div>
      <div class="landing-home-biz-card landing-home-reveal landing-home-rv1" data-idx="06">
        <span class="landing-home-biz-icon">🏋️</span>
        <div class="landing-home-biz-name">Fitness &amp; Studios</div>
        <p class="landing-home-biz-desc">Membership tiers, class scheduling, and attendance tracking made effortless.</p>
      </div>
      <div class="landing-home-biz-card landing-home-reveal landing-home-rv2" data-idx="07">
        <span class="landing-home-biz-icon">📦</span>
        <div class="landing-home-biz-name">Wholesale &amp; Distribution</div>
        <p class="landing-home-biz-desc">Bulk order management, account-based pricing, and B2B invoicing at scale.</p>
      </div>
      <div class="landing-home-biz-card landing-home-reveal landing-home-rv3" data-idx="08">
        <span class="landing-home-biz-icon">🏢</span>
        <div class="landing-home-biz-name">Your Business</div>
        <p class="landing-home-biz-desc">Tranzoop's flexible architecture adapts to virtually any business model or industry vertical.</p>
      </div>
    </div>
  </section>


  <section class="landing-home-process-section" id="process">
    <div class="landing-home-process-header landing-home-reveal">
      <div class="landing-home-section-eyebrow landing-home-section-eyebrow-centered">
        <div class="landing-home-ey-line"></div>
        <span class="landing-home-ey-text">Getting Started</span>
        <div class="landing-home-ey-line"></div>
      </div>
      <h2 class="landing-home-section-title">Up and running in<br/><em>four simple steps.</em></h2>
    </div>

    <div class="landing-home-process-steps">
      <div class="landing-home-process-step landing-home-reveal">
        <div class="landing-home-step-num">1</div>
        <div class="landing-home-step-title">Create Your Account</div>
        <p class="landing-home-step-desc">Sign up in under two minutes. No credit card required for your trial period.</p>
      </div>
      <div class="landing-home-process-step landing-home-reveal landing-home-rv1">
        <div class="landing-home-step-num">2</div>
        <div class="landing-home-step-title">Configure Your Business</div>
        <p class="landing-home-step-desc">Select your industry, import your data, and customise to match your workflows.</p>
      </div>
      <div class="landing-home-process-step landing-home-reveal landing-home-rv2">
        <div class="landing-home-step-num">3</div>
        <div class="landing-home-step-title">Onboard Your Team</div>
        <p class="landing-home-step-desc">Add staff, assign roles, and set permissions. Everyone is up to speed in minutes.</p>
      </div>
      <div class="landing-home-process-step landing-home-reveal landing-home-rv3">
        <div class="landing-home-step-num">4</div>
        <div class="landing-home-step-title">Scale With Confidence</div>
        <p class="landing-home-step-desc">Access real-time insights and grow your business backed by Tranzoop intelligence.</p>
      </div>
    </div>
  </section>


  <section class="landing-home-cta-section" id="waitlist">
    <div class="landing-home-cta-pattern"></div>
    <h2 class="landing-home-cta-title landing-home-reveal">Reserve Your Place.</h2>
    <p class="landing-home-cta-sub landing-home-reveal">
      Join thousands of business owners on the waitlist. Founding members receive priority access,
      exclusive pricing, and direct input into our product roadmap.
    </p>
    <div class="landing-home-waitlist-form landing-home-reveal">
      <input class="landing-home-waitlist-input" type="email" placeholder="your@company.com"/>
      <button class="landing-home-waitlist-btn" onClick={()=> 
        toast.info('We will contact you shortly')}>Request Access</button>
    </div>
    <p class="landing-home-cta-note landing-home-reveal">No commitment. No credit card. Early access guaranteed.</p>
  </section>


  <footer class="landing-home-footer">
    <div class="landing-home-footer-top">
      <div class="landing-home-footer-brand">
        <div class="landing-home-f-logo">Tranz<span>oop</span></div>
        <p>The business operating system for every industry. One platform. Total clarity.</p>
      </div>
      <div class="landing-home-footer-col">
        <h4>Platform</h4>
        <ul>
          <li><a href="#">Point of Sale</a></li>
          <li><a href="#">Inventory</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Invoicing</a></li>
        </ul>
      </div>
      <div class="landing-home-footer-col">
        <h4>Solutions</h4>
        <ul>
          <li><a href="#">Retail</a></li>
          <li><a href="#">Restaurants</a></li>
          <li><a href="#">Healthcare</a></li>
          <li><a href="#">Services</a></li>
        </ul>
      </div>
      <div class="landing-home-footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>

    <div class="landing-home-footer-bottom">
      <div class="landing-home-footer-copy">© 2025 Tranzoop Technologies. All rights reserved.</div>
      <div class="landing-home-footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default LandingPage