import { Routes, Route, Navigate } from "react-router-dom";
import SideBarComponent from "../components/DashBoardComp/SideBar/sidebar";
import DashBoard from "../pages/DashBoard/DashBoard/DashBoard";
import Products from "../pages/DashBoard/Products/product";
import Categories from "../pages/DashBoard/Categories/categories";
import Orders from "../pages/DashBoard/Orders/orders";


function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SideBarComponent />

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
