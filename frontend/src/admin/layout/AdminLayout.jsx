import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/SideBar";
import Topbar from "./Topbar/Topbar";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../theme";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

const AdminLayout = () => {
  const sidebarWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width:768px)");
  const currentDrawerWidth = isMobile ? 0 : (isSidebarOpen ? sidebarWidth : 0);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
      return;
    }
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#FFFAED" }}>

        <Sidebar
          drawerWidth={sidebarWidth}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          isSidebarOpen={isSidebarOpen}
        />

        <Topbar
          drawerWidth={currentDrawerWidth}
          onDrawerToggle={handleDrawerToggle}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            width: "100%"
          }}
        >
          <Toolbar />
          <Box sx={{ p: 0 }}>
            <Outlet />
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;