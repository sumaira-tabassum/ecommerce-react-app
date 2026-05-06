import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useMediaQuery } from "@mui/material";
import styles from "./SideBar.module.css";
import ShinyText from "../../../components/ShinyText/ShinyText";

const Sidebar = ({
  drawerWidth = 240,
  mobileOpen = false,
  setMobileOpen,
  isSidebarOpen = true
}) => {
  const mobileDrawerWidth = 248;
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isMobile = useMediaQuery("(max-width:768px)");
  const effectiveWidth = isMobile ? mobileDrawerWidth : (isSidebarOpen ? drawerWidth : 0);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleCloseDrawer = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // const navItemSx = {
  //   width: "auto",
  //   minWidth: "unset",
  //   display: "inline-flex",
  //   alignSelf: "flex-start",
  //   flex: "0 0 auto",
  //   justifyContent: "center",
  //   "& .MuiListItemText-root": {
  //     flex: "0 0 auto"
  //   }
  // };

  const sidebarContent = (
    <Box className={styles.sidebarContent}>
      <Box className={styles.logoWrap}>
        <ShinyText
                        text="sheglam."
                        speed={2}
                        delay={0}
                        color="#6A0610"
                        shineColor="#f4bfbf"
                        spread={120}
                        direction="left"
                        yoyo={false}
                        pauseOnHover={false}
                        disabled={false}
                        className={styles.logo}
                    />
        <Typography className={styles.logoSubTitle}>Admin Console</Typography>
      </Box>

      <List className={styles.list}>
        <ListItemButton
          component={Link}
          to="/admin"
          onClick={handleCloseDrawer}
          className={`${styles.item} ${location.pathname === "/admin" ? styles.active : ""}`}
          // sx={navItemSx}
        >
          <ListItemIcon className={styles.itemIcon}>
            <DashboardRoundedIcon sx={{ color: "#fff" }} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/products"
          onClick={handleCloseDrawer}
          className={`${styles.item} ${location.pathname.includes("/products") ? styles.active : ""}`}
          // sx={navItemSx}
        >
          <ListItemIcon className={styles.itemIcon}>
            <Inventory2RoundedIcon sx={{ color: "#fff" }} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/orders"
          onClick={handleCloseDrawer}
          className={`${styles.item} ${location.pathname.includes("/orders") ? styles.active : ""}`}
          // sx={navItemSx}
        >
          <ListItemIcon className={styles.itemIcon}>
            <ReceiptLongRoundedIcon sx={{ color: "#fff" }} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>

      </List>

      <Box className={styles.bottomSection}>
        <List className={styles.bottomList}>
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
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        className={styles.drawerRoot}
        sx={{
          width: effectiveWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? mobileDrawerWidth : drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            top: 0,
            height: "100vh",
            transition: "transform 0.25s ease",
            transform: !isMobile && !isSidebarOpen ? "translateX(-100%)" : "translateX(0)"
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
