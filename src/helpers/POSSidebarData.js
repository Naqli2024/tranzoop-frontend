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
    path: "purchase",
    icon: <BiPurchaseTag size={15} />,
    label: "PURCHASE",
  },
  {
    path: "items",
    icon: <RiArchiveLine size={15} />,
    label: "ITEMS",
  },
  {
    path: "party",
    icon: <RiTeamLine size={15} />,
    label: "PARTY",
  },
  {
    path: "stock",
    icon: <RiFileListLine size={15} />,
    label: "STOCK",
  },
  {
    path: "gst",
    icon: <RiFilePaper2Line size={15} />,
    label: "GST",
  },
  {
    path: "ledger",
    icon: <RiMoneyDollarCircleLine size={15} />,
    label: "P&L",
  },
  {
    path: "voucher",
    icon: <RiFileListLine size={15} />,
    label: "VOUCHER",
  },
];