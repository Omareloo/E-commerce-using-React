import { useEffect, useState } from "react";
import CardWidget from "../../../components/DashBoardComp/CardWidget/cardwidget";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { Box } from "@mui/material";

import { getProducts } from "../../../services/productservice";
import { getCategories } from "../../../services/categoryservice";
import { getAllAdminOrders } from "../../../services/ordersService";
import { getAllUsers } from "../../../services/usersService";

import { useSelector } from "react-redux";

export default function DashBoard() {
  const [counts, setCounts] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  });
  const {content} = useSelector((state) => state.lang);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, categories, orders, users] = await Promise.all([
          getProducts(),
          getCategories(),
          getAllAdminOrders(),
          getAllUsers(),
        ]);

        setCounts({
          products: products.total,
          categories: categories.length,
          orders: orders.length,
          users: users.length,
        });
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 3, padding: 3, flexWrap: "wrap" }}>
      <CardWidget
        title={content.Products}
        value={counts.products}
        icon={<InventoryIcon fontSize="inherit" />}
        color="#1976d2"
      />
      <CardWidget
        title={content.Categories}
        value={counts.categories}
        icon={<CategoryIcon fontSize="inherit" />}
        color="#9c27b0"
      />
      <CardWidget
        title={content.Orders}
        value={counts.orders}
        icon={<ShoppingCartIcon fontSize="inherit" />}
        color="#2e7d32"
      />
      <CardWidget
        title={content.Users}
        value={counts.users}
        icon={<PeopleIcon fontSize="inherit" />}
        color="#ff9800"
      />
    </Box>
  );
}
