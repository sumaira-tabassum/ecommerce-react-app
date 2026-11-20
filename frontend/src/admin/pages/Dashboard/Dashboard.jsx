import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import dashboardImg from "../../../assets/AllProductsImage.jpg";

const formatRs = (value) => `Rs ${Number(value || 0).toLocaleString("en-US")}`;
const BAR_COLORS = ["#f4bfbf", "#e3a3a0", "#c97a76", "#a84f4a", "#8f3b36", "#7d2a28", "#6A0610"];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setStats(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
        setError(true);
      }
    };

    fetchStats();
  }, []);

  const show = (value) => (stats ? value : "—");
  const days = stats?.salesLast7Days || [];
  const maxDay = Math.max(...days.map((d) => d.total), 1);
  const weekTotal = days.reduce((sum, d) => sum + d.total, 0);
  const categories = stats?.productsByCategory || [];

  const cards = [
    { icon: "💰", label: "Total Sales", value: show(formatRs(stats?.totalSales)), note: "All time" },
    { icon: "🛍️", label: "Total Orders", value: show(stats?.totalOrders), note: show(`${stats?.pendingOrders} pending`) },
    { icon: "👥", label: "Customers", value: show(stats?.totalCustomers), note: "Registered" },
    { icon: "📈", label: "Net Revenue", value: show(formatRs(stats?.netRevenue)), note: "Excl. shipping" }
  ];

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Dashboard</h2>
          <p className={styles.subtitle}>
            {error
              ? "Couldn't load store stats. Please try again."
              : "Welcome back. Here is what's happening with your store today."}
          </p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className={styles.statsGrid}>
        {cards.map((card) => (
          <div key={card.label} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>{card.icon}</div>
              <span className={styles.badge}>{card.note}</span>
            </div>
            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className={styles.mainGrid}>

        {/* SALES PERFORMANCE */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <div>
              <h3>Sales Performance</h3>
              <p className={styles.liveText}>
                Last 7 days • {show(formatRs(weekTotal))}
              </p>
            </div>
          </div>

          <div className={styles.barChart}>
            {days.map((d, i) => (
              <div key={d.day + i} className={styles.barCol} title={`${d.day}: ${formatRs(d.total)}`}>
                <div
                  className={styles.barFill}
                  style={{
                    height: `${Math.max((d.total / maxDay) * 100, 3)}%`,
                    background: BAR_COLORS[i % BAR_COLORS.length]
                  }}
                />
                <span className={styles.barLabel}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sideCard}>

          <h3>Products by Category</h3>

          {categories.map((c) => {
            const percent = Math.round((c.count / (stats?.totalProducts || 1)) * 100);
            return (
              <div key={c.name} className={styles.barItem}>
                <div className={styles.barHeader}>
                  <span>{c.name}</span>
                  <span>{c.count} · {percent}%</span>
                </div>
                <div className={styles.bar}>
                  <div style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}

          <div className={styles.imageCard}>
            <img
              src={dashboardImg}
              alt="noelune. collection"
              className={styles.image}
            />
            <div className={styles.imageOverlay}>
              <h4>{show(`${stats?.totalProducts} products`)}</h4>
              <p>{show(`${stats?.lowStock} low on stock`)}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
