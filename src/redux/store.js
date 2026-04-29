import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../../src/redux/Auth/AuthSlice";
import ItemReducer from "../../src/redux/POS/ItemSlice";
import CustomerReducer from "../../src/redux/POS/CustomerSlice";
import BillReducer from "../../src/redux/POS/BillSlice";
import WorkOrderReducer from "../../src/redux/POS/WorkOrderSlice";
import PurchaseReducer from "../../src/redux/POS/PurchaseSlice";
import SupplierReducer from "../../src/redux/POS/SupplierSlice";
import LedgerReducer from "../../src/redux/POS/LedgerSlice";

const rootReducer = combineReducers({
   authAdmin: AuthReducer,
   items: ItemReducer,
   customers: CustomerReducer,
   bill: BillReducer,
   workOrder: WorkOrderReducer,
   purchase: PurchaseReducer,
   supplier: SupplierReducer,
   ledger: LedgerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
