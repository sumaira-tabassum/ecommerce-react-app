import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import "./Orders.css";

const getStatusStyles = (status) => {
  const styles = {
    pending: { color: "#9a5b00" },
    processing: { color: "#1d4ed8" },
    "in transit": { color: "#6d28d9" },
    delivered: { color: "#1f7a1f" },
    cancelled: { color: "#b42318" }
  };

  return styles[status] || styles.pending;
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const statusOptions = ["pending", "processing", "in transit", "delivered", "cancelled"];

  const updateStatus = async (id, status) => {
    try {
      setUpdatingOrderId(id);

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/orders/${id}`,
        { status }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/orders`
        );
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box className="ordersContainer">

      <Typography className="ordersTitle">
        Orders
      </Typography>

      <TableContainer component={Paper} className="ordersTableCard">

        <Table>

          <TableHead>
            <TableRow className="ordersHeadRow">
              <TableCell>Order Number</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                className="ordersRow"
              >

                <TableCell className="orderCell">
                  {order.orderNumber}
                </TableCell>

                <TableCell className="orderCell bold">
                  Rs {order.totalPrice}
                </TableCell>

                <TableCell className="orderItems">
                  {order.orderItems.map((item, i) => (
                    <Box key={i} className="orderItemText">
                      {item.product?.name} × {item.quantity}
                    </Box>
                  ))}
                </TableCell>

                <TableCell className="statusCell">

                  <FormControl size="small" fullWidth>

                    <Select
                      value={order.status || "pending"}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      disabled={updatingOrderId === order._id}
                      className={`statusSelect ${order.status || "pending"}`}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>

                  </FormControl>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  );
};

export default Orders;