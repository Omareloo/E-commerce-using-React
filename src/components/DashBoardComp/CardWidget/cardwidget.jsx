import { Card, Typography, Box } from "@mui/material";

function CardWidget({ title, value, icon, color }) {
  return (
    <Card
      sx={{
        minWidth: 200,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        borderRadius: "16px",
        background: color || "#1976d2",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Box>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </Box>
      <Box sx={{ fontSize: 40, opacity: 0.8 }}>{icon}</Box>
    </Card>
  );
}

export default CardWidget;
