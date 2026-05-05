import { Drawer, List, ListItemButton, ListItemText, Box, IconButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import styles from "./SideBar.module.css";

const Sidebar = () => {
  const drawerWidth = 272;
  const mobileDrawerWidth = 248;
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

  const navItemSx = {
    width: "auto",
    minWidth: "unset",
    display: "inline-flex",
    alignSelf: "flex-start",
    flex: "0 0 auto",
    justifyContent: "center",
    "& .MuiListItemText-root": {
      flex: "0 0 auto"
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
          sx={navItemSx}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/products"
          onClick={handleCloseDrawer}
          className={`${styles.item} ${location.pathname.includes("/products") ? styles.active : ""}`}
          sx={navItemSx}
        >
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/orders"
          onClick={handleCloseDrawer}
          className={`${styles.item} ${location.pathname.includes("/orders") ? styles.active : ""}`}
          sx={navItemSx}
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
  className={styles.drawerRoot}
  sx={{
    width: isMobile ? mobileDrawerWidth : drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: isMobile ? mobileDrawerWidth : drawerWidth,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    }
  }}
  slotProps={{
    paper: {
      className: styles.drawer,
      sx: {
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none"
        }
      }
    }
  }}
  ModalProps={{ keepMounted: true }}
>
  {sidebarContent}
</Drawer>

    </>
  );
};

export default Sidebar;
