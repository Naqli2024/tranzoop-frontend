import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/Header/Header";
import SignIn from "../pages/POS/Auth/SignIn";
import SignUp from "../pages/POS/Auth/SignUp";
import POSMain from "../pages/POS/POS/POSMain";
import POS from "../pages/POS/POS/POS";
import WorkOrder from "../pages/POS/WorkOrder/WorkOrder";
import Dashboard from "../pages/POS/Dashboard/Dashboard";
import Items from "../pages/POS/Items/Items";
import Customer from "../pages/POS/Customer/Customer";
import Purchase from "../pages/POS/Purchase/Purchase";
import Stock from "../pages/POS/Stock/Stock";
import GST from "../pages/POS/GST/GST";
import Ledger from "../pages/POS/Ledger/Ledger";
import Supplier from "../pages/POS/Supplier/Supplier";
import Payments from "../pages/POS/Payments/Payments";
import Invoices from "../pages/POS/Invoices/Invoices";
import Settings from "../pages/POS/Settings/Settings";
import InvoiceModal from "../pages/POS/Payments/InvoiceModal";
import ScannedInvoice from "../pages/POS/Invoices/ScannedInvoice";
import LandingPage from "../pages/POS/HomePage/LandingPage";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";


const AppRoutes = () => {
  const location = useLocation();
  const publicPaths = [
    "/",
  ];

  const hideHeaderRoutes = ["/", "/platform", "/login", "/transport", "/invoice/:invNo"];

  const hideHeader = hideHeaderRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );


  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoutes>
              <LandingPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <SignIn />
            </PublicRoutes>
          }
        />
        <Route
          path="/invoice/:invNo"
          element={
            <PublicRoutes>
              <ScannedInvoice />
            </PublicRoutes>
          }
        />
        <Route element={
          <ProtectedRoutes>
            <POSMain />
          </ProtectedRoutes>
        }>
          <Route
            path="/pos"
            element={
              <POS />
            }
          />
          <Route
            path="/work-order"
            element={
              <WorkOrder />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard />
            }
          />
          <Route
            path="/purchase"
            element={
              <Purchase />
            }
          />
          <Route
            path="/supplier"
            element={
              <Supplier />
            }
          />
          <Route
            path="/items"
            element={
              <Items />
            }
          />
          <Route
            path="/customer"
            element={
              <Customer />
            }
          />
          <Route
            path="/stock"
            element={
              <Stock />
            }
          />
          <Route
            path="/payments"
            element={
              <Payments />
            }
          />
          <Route
            path="/invoices"
            element={
              <Invoices />
            }
          />
          <Route
            path="/gst"
            element={
              <GST />
            }
          />
          <Route
            path="/ledger"
            element={
              <Ledger />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings />
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
