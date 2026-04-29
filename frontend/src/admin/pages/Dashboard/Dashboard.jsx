import { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [stats] = useState({
    totalProducts: 24,
    totalCategories: 3,
    totalOrders: 12,
    revenue: 5600
  });

  return (
    <div className={styles.container}>

      <Typography variant="h4" className={styles.title}>
        Admin Dashboard
      </Typography>

      <Box className={styles.grid}>

        <Card className={styles.card}>
          <CardContent>
            <Typography className={styles.label}>Products</Typography>
            <Typography className={styles.value}>
              {stats.totalProducts}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardContent>
            <Typography className={styles.label}>Categories</Typography>
            <Typography className={styles.value}>
              {stats.totalCategories}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardContent>
            <Typography className={styles.label}>Orders</Typography>
            <Typography className={styles.value}>
              {stats.totalOrders}
            </Typography>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardContent>
            <Typography className={styles.label}>Revenue</Typography>
            <Typography className={styles.value}>
              Rs {stats.revenue}
            </Typography>
          </CardContent>
        </Card>

      </Box>

    </div>
  );
};

export default Dashboard;