import { useEffect, useState } from "react";
import OrderTable from "../../../components/DashBoardComp/Orders/OrderTable";
import { getAllAdminOrders, updateOrderStatus } from "../../../services/ordersService";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllAdminOrders();

         const mappedOrders = data.map((order) => ({
          _id: order._id,
          customer: order.userId?.userName || "Unknown User",
          totalPrice: order.totalPrice,
          shippingAddress: order.shippingAddress,
          status: order.status,  
        }));

        setOrders(mappedOrders);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    fetchOrders();
  }, []);

  const handleAccept = async (id) => {
    try {
      await updateOrderStatus(id, "shipped");  
      setOrders(
        orders.map((o) =>
          o._id === id ? { ...o, status: "shipped" } : o
        )
      );
    } catch (err) {
      console.error("Error accepting order", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateOrderStatus(id, "canceled");  
      setOrders(
        orders.map((o) =>
          o._id === id ? { ...o, status: "canceled" } : o
        )
      );
    } catch (err) {
      console.error("Error rejecting order", err);
    }
  };

  return (
    <div>
      <OrderTable orders={orders} onAccept={handleAccept} onReject={handleReject} />
    </div>
  );
}
