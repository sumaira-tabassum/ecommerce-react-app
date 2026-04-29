import Sidebar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
  <Sidebar />

  <div style={{ marginLeft: 240, width: "100%" }}>
    <Outlet />
  </div>
</div>
  );
};

export default AdminLayout;