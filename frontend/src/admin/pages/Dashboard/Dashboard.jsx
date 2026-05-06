import styles from "./Dashboard.module.css";
import dashboardImg from "../../../assets/bg.jpg";

const Dashboard = () => {
  return (
    <div className={styles.container}>

      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Dashboard</h2>
          <p className={styles.subtitle}>
            Welcome back. Here is what's happening with your store today.
          </p>
        </div>

        {/* <button className={styles.exportBtn}>
          Export Report
        </button> */}
      </div>

      {/* STATS GRID */}
      <div className={styles.statsGrid}>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconBox}>💰</div>
            <span className={styles.positive}>+12.5%</span>
          </div>
          <p>Total Sales</p>
          <h3>$128,430</h3>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconBox}>🛍️</div>
            <span className={styles.positive}>+8.2%</span>
          </div>
          <p>Total Orders</p>
          <h3>1,240</h3>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconBox}>👥</div>
            <span className={styles.negative}>-2.4%</span>
          </div>
          <p>Active Customers</p>
          <h3>8,942</h3>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconBox}>📈</div>
            <span className={styles.positive}>+15.1%</span>
          </div>
          <p>Net Revenue</p>
          <h3>$94,200</h3>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className={styles.mainGrid}>

        {/* SALES PERFORMANCE */}
        <div className={styles.chartCard}>

          <div className={styles.cardHeader}>
            <div>
              <h3>Sales Performance</h3>
              <p className={styles.liveText}>
                Live revenue stream • updated 2 minutes ago
              </p>
            </div>

            <div className={styles.toggle}>
              <button className={styles.activeBtn}>Weekly</button>
              <button>Monthly</button>
            </div>
          </div>

          <div className={styles.barChart}>
            <div style={{ height: "40%", background: "#f4bfbf" }} />
            <div style={{ height: "60%", background: "#e3a3a0" }} />
            <div style={{ height: "45%", background: "#c97a76" }} />
            <div style={{ height: "80%", background: "#a84f4a" }} />
            <div style={{ height: "70%", background: "#8f3b36" }} />
            <div style={{ height: "95%", background: "#6A0610" }} />
            <div style={{ height: "75%", background: "#7d2a28" }} />
          </div>

        </div>

        <div className={styles.sideCard}>

          <h3>Top Categories</h3>

          <div className={styles.barItem}>
            <div className={styles.barHeader}>
              <span>Face</span>
              <span>65%</span>
            </div>
            <div className={styles.bar}>
              <div style={{ width: "65%" }} />
            </div>
          </div>

          <div className={styles.barItem}>
            <div className={styles.barHeader}>
              <span>Eyes</span>
              <span>42%</span>
            </div>
            <div className={styles.bar}>
              <div style={{ width: "42%" }} />
            </div>
          </div>

          <div className={styles.barItem}>
            <div className={styles.barHeader}>
              <span>Lips</span>
              <span>28%</span>
            </div>
            <div className={styles.bar}>
              <div style={{ width: "28%" }} />
            </div>
          </div>

          <div className={styles.imageCard}>
            <div className={styles.imageCard}>

              <img
                src={dashboardImg}
                alt="Dashboard visual"
                className={styles.image}
              />

              <div className={styles.imageOverlay}>
                <h4>Premium Collection</h4>
                <p>New arrivals this week</p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* <div className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <h3>Recent Orders</h3>
        </div>

        <table className={styles.table}>
          <tbody>
            <tr>
              <td>#SG-9284</td>
              <td>Eleanor May</td>
              <td>$240.50</td>
              <td>Delivered</td>
            </tr>

            <tr>
              <td>#SG-9285</td>
              <td>Julian Danvers</td>
              <td>$1,120.00</td>
              <td>Processing</td>
            </tr>

            <tr>
              <td>#SG-9286</td>
              <td>Sienna Cole</td>
              <td>$89.00</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>

      </div> */}

    </div>
  );
};

export default Dashboard;