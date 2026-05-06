import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Topbar.module.css";

const Topbar = ({ drawerWidth = 240, onDrawerToggle }) => {
  const { user } = useAuth();
  const adminName = user?.name || "Admin";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        left: { md: `${drawerWidth}px` },
      }}
      className={styles.appbar}
    >
      <Toolbar className={styles.toolbar}>
        <IconButton
          className={styles.menuBtn}
          onClick={onDrawerToggle}
          aria-label="toggle sidebar drawer"
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box className={styles.rightSection}>

          {/* Notification */}
          <IconButton className={styles.notifyBtn}>
            <Badge variant="dot" className={styles.badge}>
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>

          {/* Divider Line */}
          <div className={styles.divider}></div>

          {/* Profile */}
          <div className={styles.profileBox}>
            <Avatar className={styles.avatar}>
              {adminName.slice(0, 1).toUpperCase()}
            </Avatar>

            <Typography className={styles.adminName}>
              {adminName}
            </Typography>
          </div>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;