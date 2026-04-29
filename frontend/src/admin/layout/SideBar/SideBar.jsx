import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      classes={{ paper: styles.drawer }}
    >
      <List className={styles.list}>

        <ListItemButton
          component={Link}
          to="/admin"
          className={`${styles.item} ${location.pathname === "/admin" ? styles.active : ""}`}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/products"
          className={`${styles.item} ${location.pathname.includes("/products") ? styles.active : ""}`}
        >
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/orders"
          className={`${styles.item} ${location.pathname.includes("/orders") ? styles.active : ""}`}
        >
          <ListItemText primary="Orders" />
        </ListItemButton>

      </List>
    </Drawer>
  );
};

export default Sidebar;