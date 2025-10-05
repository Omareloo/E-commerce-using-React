import { useEffect, useState } from "react";
import OrderTable from "../../../components/DashBoardComp/Orders/OrderTable";
import { getAllAdminOrders, updateOrderStatus } from "../../../services/ordersService";
import { useSelector } from "react-redux";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const {content} = useSelector((state) => state.lang);

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
      await updateOrderStatus(id, content.shipped);  
      setOrders(
        orders.map((o) =>
          o._id === id ? { ...o, status: content.shipped } : o
        )
      );
    } catch (err) {
      console.error("Error accepting order", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateOrderStatus(id, content.canceled);  
      setOrders(
        orders.map((o) =>
          o._id === id ? { ...o, status: content.canceled } : o
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
