import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People"; // 👤 أيقونة Users
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { text: "Products", path: "/dashboard/products", icon: <InventoryIcon /> },
  { text: "Categories", path: "/dashboard/categories", icon: <CategoryIcon /> },
  { text: "Orders", path: "/dashboard/orders", icon: <ShoppingCartIcon /> },
  { text: "Users", path: "/dashboard/users", icon: <PeopleIcon /> }, // ✅ Users
];

function SideBarComponent() {
  const location = useLocation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e1e2f",
          color: "#fff",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <h2 style={{ padding: "20px", textAlign: "center" }}>Admin</h2>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#3f51b5",
                  color: "white",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBarComponent;
