import { useState } from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [stats] = useState({
    totalProducts: 24,
    totalCategories: 3,
    totalOrders: 12,
    revenue: 5600,
  });

  const salesData = [
    { label: "Mon", value: 900 },
    { label: "Tue", value: 1200 },
    { label: "Wed", value: 800 },
    { label: "Thu", value: 1500 },
    { label: "Fri", value: 1100 },
    { label: "Sat", value: 1700 },
    { label: "Sun", value: 1400 },
  ];

  const categoryData = [
    { label: "Face", value: 45 },
    { label: "Eyes", value: 30 },
    { label: "Lips", value: 25 },
  ];

  const maxSales = Math.max(...salesData.map((i) => i.value));

  const linePoints = salesData
    .map((item, index) => {
      const x = (index / (salesData.length - 1)) * 100;
      const y = 100 - (item.value / maxSales) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
   <div className={styles.container}>

  <div className={styles.header}>
    <h1>Dashboard</h1>
    <p>Welcome back — here’s your store overview</p>
  </div>

  {/* TOP SECTION */}
  <div className={styles.topSection}>

    {/* FEATURE CARD */}
    <div className={styles.featureCard}>
      <div>
        <p>Total Revenue</p>
        <h2>Rs {stats.revenue}</h2>
      </div>

      <div className={styles.featureChart}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={`M0 100 ${linePoints.replace(/,/g, " ").replace(/ /g, " L")} L100 100 Z`}
            className={styles.featureArea}
          />
        </svg>
      </div>
    </div>

    {/* SIDE STATS */}
    <div className={styles.sideStats}>

      <div className={styles.miniCard}>
        <span>📦</span>
        <div>
          <p>Products</p>
          <strong>{stats.totalProducts}</strong>
        </div>
      </div>

      <div className={styles.miniCard}>
        <span>🗂️</span>
        <div>
          <p>Categories</p>
          <strong>{stats.totalCategories}</strong>
        </div>
      </div>

      <div className={styles.miniCard}>
        <span>🛍️</span>
        <div>
          <p>Orders</p>
          <strong>{stats.totalOrders}</strong>
        </div>
      </div>

    </div>

  </div>

  {/* BOTTOM */}
  <div className={styles.bottomSection}>

    <div className={styles.salesCard}>
      <h3>Weekly Sales</h3>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={linePoints}
          className={styles.chartLine}
          fill="none"
        />
      </svg>
    </div>

    <div className={styles.categoryCard}>
      <h3>Category Split</h3>

      {categoryData.map((item) => (
        <div key={item.label} className={styles.categoryItem}>
          <div>
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>

          <div className={styles.bar}>
            <div style={{ width: `${item.value}%` }} />
          </div>
        </div>
      ))}

    </div>

  </div>

</div>
  );
};

export default Dashboard;