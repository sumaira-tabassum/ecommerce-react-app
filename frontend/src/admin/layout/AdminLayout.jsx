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
          width: "100%",
          flex: 1,
          minWidth: 0,
          paddingTop: isMobile ? 70 : 0
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
