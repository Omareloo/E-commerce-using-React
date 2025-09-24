import CardWidget from "../../../components/DashBoardComp/CardWidget/cardwidget";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box } from "@mui/material";

export default function DashBoard() {
  return (
    <Box sx={{ display: "flex", gap: 3, padding: 3 }}>
      <CardWidget
        title="Total Products"
        value="120"
        icon={<InventoryIcon fontSize="inherit" />}
        color="#1976d2"
      />
      <CardWidget
        title="Categories"
        value="8"
        icon={<CategoryIcon fontSize="inherit" />}
        color="#9c27b0"
      />
      <CardWidget
        title="Orders"
        value="35"
        icon={<ShoppingCartIcon fontSize="inherit" />}
        color="#2e7d32"
      />
      <CardWidget
        title="Visitors"
        value="450"
        icon={<DashboardIcon fontSize="inherit" />}
        color="#ff9800"
      />
    </Box>
  );
}
