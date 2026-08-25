import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FiUser,
  FiTruck,
  FiClipboard,
  FiTool,
  FiFileText,
  FiCreditCard,
  FiMonitor,
  FiBarChart2,
  FiShoppingCart,
  FiPackage,
  FiGrid,
  FiBox,
  FiCheck,
  FiChevronDown,
  FiSun,
  FiMoon,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { PiWarehouse } from "react-icons/pi";
import HeroBanner from "../../../assets/images/hero-banner.png";
import Inventory from "../../../assets/images/inventory-racks.jpg";
import POSCounter from "../../../assets/images/pos-counter.jpg";
import WorkOrder from "../../../assets/images/workorder-bay.jpg";
import "../../../assets/styles/landingPage.css";
import { ThemeContext } from "../../../helpers/ThemeContext";
import { useNavigate } from "react-router-dom";

/* ---------------- data ---------------- */

const flowSteps = [
  { label: "Customer", sub: "Walk-in / call", Icon: FiUser },
  { label: "Vehicle", sub: "Reg. & history", Icon: FiTruck },
  { label: "Work Order", sub: "Service job", Icon: FiClipboard, hero: true },
  { label: "Service / Repair", sub: "Workshop bay", Icon: FiTool },
  { label: "Tyres & Parts", sub: "Fitted & used", Icon: GiCarWheel },
  { label: "Invoice", sub: "Final bill", Icon: FiFileText },
  { label: "Payment", sub: "Settled", Icon: FiCreditCard },
];

const heroStats = [
  { v: "6 min", l: "Job to invoice" },
  { v: "100%", l: "Stock accuracy" },
  { v: "11", l: "Modules" },
  { v: "0", l: "Spreadsheets" },
];

const modules = [
  {
    name: "POS",
    desc: "Fast counter billing for tyres, parts and quick services.",
    Icon: FiMonitor,
  },
  {
    name: "Work Order",
    desc: "Create and track tyre services, repairs and maintenance jobs.",
    Icon: FiClipboard,
    featured: true,
  },
  {
    name: "Dashboard",
    desc: "A clear daily overview of jobs, sales and shop performance.",
    Icon: FiBarChart2,
  },
  {
    name: "Customer",
    desc: "Customer details, vehicles and complete service history.",
    Icon: FiUser,
  },
  {
    name: "Supplier",
    desc: "Supplier records, contacts and purchase relationships.",
    Icon: PiWarehouse,
  },
  {
    name: "Purchase",
    desc: "Record tyre, parts and product purchases with costs.",
    Icon: FiShoppingCart,
  },
  {
    name: "Inventory",
    desc: "Manage tyres, parts and other shop products by size and brand.",
    Icon: FiPackage,
  },
  {
    name: "Stock",
    desc: "Track available stock, movement and low-stock alerts.",
    Icon: FiGrid,
  },
  {
    name: "Invoice",
    desc: "Invoice products, services and repairs in a single bill.",
    Icon: FiFileText,
  },
  {
    name: "Payment",
    desc: "Record payments and keep outstanding balances visible.",
    Icon: FiCreditCard,
  },
  {
    name: "P&L",
    desc: "Track revenue, expenses and real business profitability.",
    Icon: FiBox,
  },
];

const chips = [
  "Tyre Replacement",
  "Tyre Fitting",
  "Wheel Alignment",
  "Wheel Balancing",
  "Puncture Repair",
  "Tyre Rotation",
  "Vehicle Service",
  "Repair & Maintenance",
];

const miniFlow = [
  "Vehicle",
  "Inspection",
  "Service / Repair",
  "Tyres & Parts",
  "Completion",
];

const bizFlow = [
  {
    tag: "01 — Arrival",
    title: "Customer",
    desc: "Capture customer and vehicle information in seconds.",
    Icon: FiUser,
  },
  {
    tag: "02 — Job Created",
    title: "Work Order",
    desc: "Open the service or repair job with the exact tasks.",
    Icon: FiClipboard,
  },
  {
    tag: "03 — Workshop",
    title: "Service",
    desc: "Perform tyre service, repair or maintenance in the bay.",
    Icon: FiTool,
  },
  {
    tag: "04 — Parts Used",
    title: "Inventory",
    desc: "Track every tyre and part consumed on the job.",
    Icon: FiPackage,
  },
  {
    tag: "05 — Billing",
    title: "Invoice",
    desc: "Generate the final bill straight from the work order.",
    Icon: FiFileText,
  },
  {
    tag: "06 — Settled",
    title: "Payment",
    desc: "Record payment and keep the balance up to date.",
    Icon: FiCreditCard,
  },
];

const groups = [
  {
    title: "Workshop",
    items: [
      ["Customer", FiUser],
      ["Work Order", FiClipboard],
      ["POS", FiMonitor],
    ],
  },
  {
    title: "Inventory",
    items: [
      ["Inventory", FiPackage],
      ["Stock", FiGrid],
      ["Purchase", FiShoppingCart],
      ["Supplier", PiWarehouse],
    ],
  },
  {
    title: "Billing & Finance",
    items: [
      ["Invoice", FiFileText],
      ["Payment", FiCreditCard],
      ["P&L", FiBox],
    ],
  },
  {
    title: "Business Overview",
    items: [
      ["Dashboard", FiBarChart2],
      ["Vehicles", FiTruck],
    ],
  },
];

const plans = [
  {
    name: "Single Bay",
    price: "$29",
    period: "/month",
    cta: "Start free trial",
    features: [
      "1 workshop bay",
      "POS & invoicing",
      "Customer & vehicle records",
      "Basic stock tracking",
    ],
  },
  {
    name: "Full Shop",
    price: "$59",
    period: "/month",
    featured: true,
    cta: "Start free trial",
    features: [
      "Unlimited bays & users",
      "Work orders + inventory",
      "Purchases & suppliers",
      "P&L and dashboards",
    ],
  },
  {
    name: "Multi-Branch",
    price: "Custom",
    period: "",
    cta: "Talk to us",
    features: [
      "Multiple locations",
      "Consolidated reporting",
      "Stock transfers",
      "Priority onboarding",
    ],
  },
];

const faqs = [
  {
    q: "Do I need to move all my old records in first?",
    a: "No. Start by billing today's jobs. Customers, vehicles and stock build up as you work, and you can import existing lists whenever you're ready.",
  },
  {
    q: "Can I bill tyres and services on the same invoice?",
    a: "Yes. A work order can carry fitted tyres, parts and labour lines together, and the invoice is generated from it in one step.",
  },
  {
    q: "Does it track stock across sizes and brands?",
    a: "Every tyre is tracked by brand, size and pattern, so stock counts stay accurate as items are purchased, fitted or sold over the counter.",
  },
  {
    q: "Will it work on a phone or tablet in the bay?",
    a: "The whole app is responsive, so the counter can run on a desktop while technicians update jobs from a tablet or phone.",
  },
];

/* ---------------- reveal-on-scroll hook ---------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------- component ---------------- */

export default function TyreShopLanding() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="tyre-lp" data-theme={theme} id="app">
      {/* ---------- header ---------- */}
      <header className="tyre-lp-header">
        <div className="tyre-lp-shell tyre-lp-header-inner">
          <a className="tyre-lp-logo" onClick={()=> window.location.href="https://tranzoop.com/"}>
            <span className="tyre-lp-logo-mark">
              <GiCarWheel className="tyre-lp-spin" />
            </span>
            <span>
              <span className="tranzoop-text">Tranzoop</span>
              <span className="tyre-shop-text">Tyre Shop</span>
            </span>
          </a>
          <nav className="tyre-lp-nav">
            <a href="#modules">Modules</a>
            <a href="#workorder">Work Order</a>
            <a href="#how">How it works</a>
          </nav>
          <div className="tyre-lp-header-actions">
            <button
              className="tyre-lp-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            <a
              className="tyre-lp-btn tyre-lp-btn-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="tyre-lp-hero">
          <div className="tyre-lp-hero-glow" />
          <div className="tyre-lp-shell">
            <div className="tyre-lp-hero-inner">
              <Reveal className="tyre-lp-badge" as="span" delay={80}>
                <span className="tyre-lp-badge-dot" />
                Built for tyre shops &amp; auto service centers
              </Reveal>
              <Reveal as="h1" delay={80}>
                Run your tyre shop from <span>customer to cash</span> in one
                place
              </Reveal>
              <Reveal as="p" delay={160}>
                Manage customers and vehicles, open work orders for tyre service
                and repair, track tyres and parts as they're fitted, and bill it
                all out — without switching between spreadsheets, notebooks and
                messaging apps.
              </Reveal>
              <Reveal className="tyre-lp-hero-actions" delay={240}>
                <a
                  className="tyre-lp-btn tyre-lp-btn-primary tyre-lp-btn-lg"
                  href="#workorder"
                >
                  See Work Order in action
                </a>
                <a
                  className="tyre-lp-btn tyre-lp-btn-ghost tyre-lp-btn-lg"
                  href="#modules"
                >
                  Explore modules
                </a>
              </Reveal>

              <Reveal className="tyre-lp-hero-media" delay={300}>
                {/* Replace with your own hero image */}
                <img
                  src={HeroBanner}
                  alt="Tyre workshop bay with a vehicle on the hoist"
                  loading="lazy"
                />
                <div className="tyre-lp-hero-stats">
                  {heroStats.map((s) => (
                    <div className="tyre-lp-hero-stat" key={s.l}>
                      <strong>{s.v}</strong>
                      <span>{s.l}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="tyre-lp-flow">
                {flowSteps.map((s, i) => (
                  <Reveal
                    as="div"
                    key={s.label}
                    delay={i * 70}
                    className={`tyre-lp-flow-step${s.hero ? " is-hero" : ""}`}
                  >
                    <div className="tyre-lp-flow-icon">
                      <s.Icon />
                    </div>
                    <div className="tyre-lp-flow-label">{s.label}</div>
                    <div className="tyre-lp-flow-sub">{s.sub}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="tyre-lp-tread-rule" />

        {/* ---------- modules ---------- */}
        <section className="tyre-lp-section" id="modules">
          <div className="tyre-lp-shell">
            <Reveal className="tyre-lp-section-head">
              <span className="tyre-lp-eyebrow">The complete toolkit</span>
              <h2 className="tyre-lp-h2">Everything your tyre shop needs</h2>
              <p className="tyre-lp-sub">
                From customer visits and vehicle servicing to inventory, billing
                and payments — manage your complete tyre shop operation from one
                application.
              </p>
            </Reveal>
            <div className="tyre-lp-module-grid">
              {modules.map((m, i) => (
                <Reveal
                  as="article"
                  key={m.name}
                  delay={(i % 4) * 70}
                  className={`tyre-lp-module-card${m.featured ? " is-featured" : ""}`}
                >
                  <div className="tyre-lp-module-icon">
                    <m.Icon />
                  </div>
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- work order ---------- */}
        <section className="tyre-lp-section tyre-lp-section-alt" id="workorder">
          <div className="tyre-lp-shell">
            <Reveal className="tyre-lp-workorder">
              <div>
                <span className="tyre-lp-eyebrow">Workshop job management</span>
                <h3>Manage every workshop job</h3>
                <p className="tyre-lp-sub">
                  Every job that comes through your bay — tyre replacement,
                  alignment, balancing, puncture repair or a full vehicle
                  service — starts as a work order and stays tracked from
                  inspection to completion, with parts and labour attached as
                  the technician works.
                </p>
                <div className="tyre-lp-chip-row">
                  {chips.map((c) => (
                    <span className="tyre-lp-chip" key={c}>
                      <FiCheck />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="tyre-lp-workorder-visual">
                <div className="tyre-lp-workorder-photo">
                  {/* Replace with your own photo */}
                  <img
                    src={WorkOrder}
                    alt="Alloy wheel on a balancing machine"
                    loading="lazy"
                  />
                </div>
                <div className="tyre-lp-mini-flow">
                  {miniFlow.map((s, i) => (
                    <div className="tyre-lp-mini-flow-step" key={s}>
                      <span className="tyre-lp-mini-flow-dot">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="tyre-lp-mini-flow-text">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- business flow ---------- */}
        <section className="tyre-lp-section" id="how">
          <div className="tyre-lp-shell">
            <Reveal className="tyre-lp-section-head">
              <span className="tyre-lp-eyebrow">The everyday workflow</span>
              <h2 className="tyre-lp-h2">From customer arrival to payment</h2>
              <p className="tyre-lp-sub">
                A tyre shop's day, mapped the way it actually happens on the
                floor — not the way generic software imagines it.
              </p>
            </Reveal>
            <div className="tyre-lp-bizflow-wrap">
              <Reveal className="tyre-lp-bizflow-photo">
                {/* Replace with your own photo */}
                <img
                  src={POSCounter}
                  alt="Customer paying at the service counter"
                  loading="lazy"
                />
              </Reveal>
              <div className="tyre-lp-bizflow">
                {bizFlow.map((r, i) => (
                  <Reveal
                    as="div"
                    key={r.title}
                    delay={i * 60}
                    className="tyre-lp-bizflow-row"
                  >
                    <div className="tyre-lp-bizflow-num">
                      <r.Icon />
                    </div>
                    <div className="tyre-lp-bizflow-body">
                      <span className="tyre-lp-bizflow-tag">{r.tag}</span>
                      <h4>{r.title}</h4>
                      <p>{r.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- groups ---------- */}
        <section className="tyre-lp-section tyre-lp-section-alt">
          <div className="tyre-lp-shell">
            <Reveal className="tyre-lp-section-head">
              <span className="tyre-lp-eyebrow">Organized by how you work</span>
              <h2 className="tyre-lp-h2">
                Every operation, grouped the way your shop runs
              </h2>
            </Reveal>
            <div className="tyre-lp-group-grid">
              {groups.map((g, i) => (
                <Reveal
                  as="div"
                  key={g.title}
                  delay={i * 80}
                  className="tyre-lp-group-card"
                >
                  <h4>{g.title}</h4>
                  {g.items.map(([label, Icon]) => (
                    <div className="tyre-lp-group-item" key={label}>
                      <Icon />
                      {label}
                    </div>
                  ))}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- cta ---------- */}
        <section className="tyre-lp-section" id="cta">
          <div className="tyre-lp-shell">
            <Reveal
              className="tyre-lp-cta-band"
              style={{
                backgroundImage: `url(${Inventory})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <span className="tyre-lp-eyebrow">Ready when you are</span>

              <h2 className="tyre-lp-h2 text-white">
                Bring your tyre shop onto one screen
              </h2>

              <p className="tyre-lp-sub">
                From the first customer walk-in to the last payment collected —
                set up your shop in minutes and bill your next job from the same
                screen.
              </p>

              <div className="tyre-lp-cta-actions">
                <a
                  className="tyre-lp-btn tyre-lp-btn-ghost tyre-lp-btn-lg"
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="tyre-lp-footer">
        <div className="tyre-lp-shell">
          <div className="tyre-lp-footer-top">
            <div className="tyre-lp-footer-about">
              <a className="tyre-lp-logo" href="#top">
                <span className="tyre-lp-logo-mark">
                  <GiCarWheel className="tyre-lp-spin" />
                </span>
                <span>
                  <span className="tranzoop-text">Tranzoop</span>
                  <span className="tyre-shop-text">Tyre Shop</span>
                </span>
              </a>
              <p>
                Shop software built around the way tyre and auto service
                businesses actually run — jobs in the bay, stock on the rack,
                money at the counter.
              </p>
            </div>
            <div className="tyre-lp-footer-col">
              <h5>Product</h5>
              <ul>
                <li>
                  <a href="#modules">Modules</a>
                </li>
                <li>
                  <a href="#workorder">Work Order</a>
                </li>
                <li>
                  <a href="#how">How it works</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
              </ul>
            </div>
            <div className="tyre-lp-footer-col">
              <h5>Operations</h5>
              <ul>
                <li>
                  <a href="#modules">POS &amp; Billing</a>
                </li>
                <li>
                  <a href="#modules">Inventory &amp; Stock</a>
                </li>
                <li>
                  <a href="#modules">Purchases &amp; Suppliers</a>
                </li>
                <li>
                  <a href="#modules">Invoices &amp; Payments</a>
                </li>
              </ul>
            </div>
            <div className="tyre-lp-footer-col">
              <h5>Company</h5>
              <ul>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#cta">Contact</a>
                </li>
                <li>
                  <a href="#cta">Support</a>
                </li>
                <li>
                  <a href="#cta">Privacy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tyre-lp-footer-bottom">
            <span>
              © {new Date().getFullYear()} Tranzoop. All rights reserved
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
