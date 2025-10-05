import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useSelector } from "react-redux";


export default function OrderTable({ orders, onAccept, onReject }) {

    const {content} = useSelector((state) => state.lang);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "green";
      case "canceled":
        return "red";
      case "pending":
        return "orange";
      case "delivered":
        return "blue";
      default:
        return "black";
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{content.Customer}</TableCell>
            <TableCell>{content.TotalPrice}</TableCell>
            <TableCell>{content.ShippingAddress}</TableCell>
            <TableCell>{content.Status}</TableCell>
            <TableCell>{content.Actions}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((o) => (
            <TableRow key={o._id}>
              <TableCell>{o.customer}</TableCell>
              <TableCell>{o.totalPrice} EGP</TableCell>
              <TableCell>{o.shippingAddress}</TableCell>
              <TableCell
                sx={{ color: getStatusColor(o.status), fontWeight: "bold" }}
              >
                {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
              </TableCell>
              <TableCell>
                {o.status.toLowerCase() === "pending" && (
                  <>
                    <IconButton
                      color="success"
                      onClick={() => onAccept(o._id)}
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onReject(o._id)}
                    >
                      <Cancel />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
