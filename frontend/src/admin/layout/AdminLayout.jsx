import Sidebar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const AdminLayout = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: isMobile ? 0 : 240,
          width: "100%",
          paddingTop: isMobile ? 70 : 0
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
