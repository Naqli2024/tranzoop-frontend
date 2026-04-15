import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/Header/Header";
import HomePage from "../pages/POS/HomePage/HomePage";
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


const AppRoutes = () => {
  const [theme, setTheme] = useState(Cookies.get("themeMode") || "dark");
  const location = useLocation();
  const publicPaths = [
    "/",
  ];

    const hideHeaderRoutes = ["/","/sign-in","/sign-up"];

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
              <HomePage />
          }
        />
        <Route
          path="sign-in"
          element={
              <SignIn />
          }
        />
        <Route
          path="sign-up"
          element={
              <SignUp />
          }
        />
        <Route path="/pos" element={<POSMain />}>
        <Route
          path="pos"
          element={
              <POS />
          }
        />
        <Route
          path="work-order"
          element={
              <WorkOrder/>
          }
        />
        <Route
          path="dashboard"
          element={
              <Dashboard/>
          }
        />
        <Route
          path="purchase"
          element={
              <Purchase/>
          }
        />
        <Route
          path="items"
          element={
              <Items/>
          }
        />
        <Route
          path="party"
          element={
              <Customer/>
          }
        />
        <Route
          path="stock"
          element={
              <Stock/>
          }
        />
        <Route
          path="gst"
          element={
              <GST/>
          }
        />
        <Route
          path="ledger"
          element={
              <Ledger/>
          }
        />
        </Route>
    </Routes>
    </>
  );
};

export default AppRoutes;
