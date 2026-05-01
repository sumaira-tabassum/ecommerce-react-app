import { Drawer, List, ListItemButton, ListItemText, Box, IconButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import styles from "./SideBar.module.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleCloseDrawer = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const sidebarContent = (
    <Box className={styles.sidebarContent}>
      <List className={styles.list}>
        <ListItemButton
          component={Link}
          to="/admin"
          onClick={handleCloseDrawer}
          className={`${styles.item} ${location.pathname === "/admin" ? styles.active : ""}`}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/products"
          onClick={handleCloseDrawer}
          className={`${styles.item} ${location.pathname.includes("/products") ? styles.active : ""}`}
        >
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/orders"
          onClick={handleCloseDrawer}
          className={`${styles.item} ${location.pathname.includes("/orders") ? styles.active : ""}`}
        >
          <ListItemText primary="Orders" />
        </ListItemButton>
      </List>

      <Box className={styles.bottomSection}>
        <Box className={styles.profileBox}>
          <p className={styles.profileLabel}>Signed in as</p>
          <p className={styles.profileName}>{user?.name || "Admin"}</p>
          {/* <p className={styles.email}>{user?.email || "Admin"}</p> */}
        </Box>

        <List className={styles.bottomList}>
          {/* <ListItemButton
            component={Link}
            to="/admin/profile"
            className={styles.item}
          >
            <ListItemText primary="Profile" />
          </ListItemButton> */}

          <ListItemButton
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            <LogoutRoundedIcon className={styles.logoutIcon} />
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && !mobileOpen && (
        <IconButton
          className={styles.menuButton}
          onClick={() => setMobileOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ className: styles.drawer }}
        ModalProps={{ keepMounted: true }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
