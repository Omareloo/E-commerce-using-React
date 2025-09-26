import { Outlet } from "react-router-dom";
import SideBarComponent from "../components/DashBoardComp/SideBar/sidebar";



function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SideBarComponent />
      <div style={{ flex: 1, padding: "20px" }}>
      <Outlet></Outlet>
      </div>
    </div>
  );
}
// <SideBarComponent />

export default DashboardLayout;
