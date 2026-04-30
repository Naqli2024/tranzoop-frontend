import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDailySales, getRevenueSplit, getSummary } from '../../../redux/POS/LedgerSlice';
import { toast } from 'react-toastify';
import { getAllOrderByBusinessId } from '../../../redux/POS/WorkOrderSlice';
import { getAllItems } from '../../../redux/POS/ItemSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState();
  const [woData, setWoData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [items, setItems] = useState([]);
  const LOW_STOCK_LIMIT = 5;
  const [filter, setFilter] = useState("ALL");
  const [revenue, setRevenue] = useState({});
  const [salesData, setSalesData] = useState([]);
  const COLORS = ["var(--accent2)", "var(--muted)"];

  useEffect(() => {
    dispatch(getRevenueSplit())
      .unwrap()
      .then((res) => {
        setRevenue(res.data || {});
      })
      .catch((err) => toast.error(err));
  }, [dispatch]);

  const topProducts = useMemo(() => {
    return [...items]
      .filter((i) => i.type === "product")
      .sort((a, b) => (b.searchCount || 0) - (a.searchCount || 0))
      .slice(0, 5);
  }, [items]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await dispatch(getAllItems()).unwrap();
        const data = res?.items || res?.data || (Array.isArray(res) ? res : []);
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    dispatch(getSummary())
      .unwrap()
      .then((response) => {
        setSummaryData(response.data);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllOrderByBusinessId())
      .unwrap()
      .then((response) => {
        setWoData(response.data || []);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const today = new Date();


  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN");


  useEffect(() => {
    if (woData?.length) {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const todays = woData.filter((wo) => {
        const created = new Date(wo.createdAt);
        return created >= startOfDay && created <= endOfDay;
      });

      setFilteredData(todays);
    }
  }, [woData]);

  const calculateGSTSummary = (items = []) => {
    let totalOutputGST = 0; // GST on sales
    let totalInputGST = 0;  // GST on purchase

    items.forEach((item) => {
      const qty = Number(item.openingStock || 0);
      const gst = Number(item.gst || 0);

      const mrp = Number(item.mrp || 0);
      const cost = Number(item.cost || 0);

      // GST on selling price (output GST)
      const outputGST = (mrp * qty * gst) / 100;

      // GST on purchase price (input GST)
      const inputGST = (cost * qty * gst) / 100;

      totalOutputGST += outputGST;
      totalInputGST += inputGST;
    });

    const cgst = totalOutputGST / 2;
    const sgst = totalOutputGST / 2;

    const netPayable = totalOutputGST - totalInputGST;

    return {
      cgst,
      sgst,
      netPayable,
      itc: totalInputGST,
    };
  };

  const gstSummary = calculateGSTSummary(items);

  const net = gstSummary?.netPayable || 0;

  const lowStockItems = items.filter(
    (item) => Number(item.openingStock || 0) <= LOW_STOCK_LIMIT
  );

  useEffect(() => {
    dispatch(getDailySales())
      .unwrap()
      .then((res) => {
        setSalesData(res.data || []);
      })
      .catch((err) => toast.error(err));
  }, [dispatch]);

  const filterSalesData = () => {
    const now = new Date();

    return salesData.filter((item) => {
      const [month, day, year] = item.date.split("/");
      const d = new Date(year, month - 1, day);

      if (filter === "ALL") return true;

      if (filter === "TODAY") {
        return d.toDateString() === now.toDateString();
      }

      if (filter === "WEEK") {
        const start = new Date();
        start.setDate(now.getDate() - 7);
        return d >= start && d <= now;
      }

      if (filter === "MONTH") {
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }

      if (filter === "YEAR") {
        return d.getFullYear() === now.getFullYear();
      }

      return true;
    });
  };

  const chartData = filterSalesData();

  const pieData = [
    { name: "Products", value: revenue.product || 0 },
    { name: "Services", value: revenue.service || 0 },
  ];

  return (
    <div class="dash-wrap">
      <div className="wo-ph">
        <span className="wo-ph-title">
          📊 Dashboard <span className="wo-ph-badge">LIVE</span>
        </span>

        <div className="wo-ph-actions">
          <select className="sel" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">All Days</option>
            <option value="TODAY">Today</option>
            <option value="WEEK">This Week</option>
            <option value="MONTH">This Month</option>
            <option value="YEAR">This Year</option>
          </select>
        </div>
      </div>
      <div class="dash-stats">
        <div class="dash-card wo-mc-pending">
          <div class="dash-card-title">TOTAL REVENUE</div>
          <div class="dash-card-value">₹{summaryData?.totalRevenue.toLocaleString('en-IN') || 0}</div>
        </div>
        <div class="dash-card wo-mc-progress">
          <div class="dash-card-title">TOTAL PROFIT</div>
          <div class="dash-card-value green">₹{summaryData?.profit.toLocaleString('en-IN') || 0}</div>
        </div>
        <div class="dash-card wo-mc-qc">
          <div class="dash-card-title">TODAY SALES</div>
          <div class="dash-card-value">₹{summaryData?.todaySales.toLocaleString('en-IN') || 0}</div>
        </div>
        <div class="dash-card wo-mc-done">
          <div class="dash-card-title">WORK ORDERS TODAY</div>
          <div class="dash-card-value blue">{filteredData.length}</div>
        </div>
      </div>
      <div class="dash-grid">
        <div class="dash-left">
          <div className="dash-panel">
            <div className="dash-panel-title">
              SALES (₹)
            </div>

            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} barCategoryGap="5%"
                  barGap={-5} >
                  <XAxis
                    dataKey="date"
                    tickFormatter={(val) =>
                      new Date(val).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })
                    }
                  />
                  <YAxis />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      fontSize: "12px"
                    }}
                    labelStyle={{ color: "#9ca3af", fontSize: "11px" }}
                    itemStyle={{ color: "#fff", fontSize: "12px" }}
                    formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                  />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="var(--accent2)" barSize={70} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="dash-panel">
            <div className="dash-panel-title">TOP 5 PRODUCTS</div>
            <div className="dash-list">
              {topProducts.map((item, index) => {
                const max = topProducts[0]?.searchCount || 1;
                const percent = ((item.searchCount || 0) / max) * 100;
                return (
                  <div key={item._id}>
                    <div className="dash-row">
                      <span>{item.itemName}</span>
                      <span>{item.searchCount} searches</span>
                    </div>

                    <div className="dash-progress">
                      <div style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div class="dash-right">
          <div class="dash-panel">
            <div class="dash-panel-title">GST SUMMARY</div>

            <div class="dash-gst">
              <div class="dash-gst-card">
                CGST<br />
                <b>₹{formatCurrency(gstSummary.cgst)}</b>
              </div>

              <div class="dash-gst-card">
                SGST<br />
                <b>₹{formatCurrency(gstSummary.sgst)}</b>
              </div>

              <div class="dash-gst-card red">
                Net Pay<br />
                <b>    {net >= 0
                  ? `₹${formatCurrency(net)}`
                  : `ITC ₹${formatCurrency(Math.abs(net))}`}</b>
              </div>

              <div class="dash-gst-card green">
                ITC<br />
                <b>₹{formatCurrency(gstSummary.itc)}</b>
              </div>
            </div>
          </div>
          <div class="dash-panel">
            <div class="dash-panel-title">STOCK ALERTS</div>
            {lowStockItems.length > 0 ? (
              lowStockItems.map((item) => (
                <div key={item._id} class="dash-stock mb-2">
                  <span>⚠ {item.itemName}</span>
                  <span class="dash-badge">
                    {item.openingStock} left
                  </span>
                </div>
              ))
            ) : (
              <div class="dash-stock">
                <span>No low stock items</span>
              </div>
            )}
          </div>
          <div className="dash-panel">
            <div className="dash-panel-title">REVENUE SPLIT</div>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString("en-IN")}`
                    }
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      fontSize: "12px"
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard