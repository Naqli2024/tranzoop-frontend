import {
  RiDashboardLine,
  RiShoppingCartLine,
  RiToolsLine,
  RiArchiveLine,
  RiTeamLine,
  RiFileListLine,
  RiMoneyDollarCircleLine,
  RiFilePaper2Line,
} from "react-icons/ri";
import { BiPurchaseTag } from "react-icons/bi";
import { IoMdBusiness } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";

export const posTyresItems = [
  {
    path: "pos",
    icon: <RiShoppingCartLine size={15} />,
    label: "POS",
  },
  {
    path: "work-order",
    icon: <RiToolsLine size={15} />,
    label: "WORK",
  },
  {
    path: "dashboard",
    icon: <RiDashboardLine size={15} />,
    label: "DASH",
  },
  {
    path: "supplier",
    icon: <IoMdBusiness size={15} />,
    label: "SUPPLIER",
  },
  {
    path: "purchase",
    icon: <BiPurchaseTag size={15} />,
    label: "PURCHASE",
  },
  {
    path: "items",
    icon: <RiArchiveLine size={15} />,
    label: "INVENTORY",
  },
  {
    path: "customer",
    icon: <RiTeamLine size={15} />,
    label: "CUSTOMERS",
  },
  {
    path: "stock",
    icon: <RiFileListLine size={15} />,
    label: "STOCK",
  },
  {
    path: "payments",
    icon: <MdOutlinePayments size={15} />,
    label: "PAYMENTS",
  },
  {
    path: "invoices",
    icon: <LiaFileInvoiceSolid size={15} />,
    label: "INVOICES",
  },
  // {
  //   path: "gst",
  //   icon: <RiFilePaper2Line size={15} />,
  //   label: "GST",
  // },
  {
    path: "ledger",
    icon: <RiMoneyDollarCircleLine size={15} />,
    label: "P&L",
  },
];