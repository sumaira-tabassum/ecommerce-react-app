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
  Chip,
  Box
} from "@mui/material";

const btnStyle = {
  border: "1px solid #6A0610",
  background: "transparent",
  color: "#6A0610",
  borderRadius: "4px",
  padding: "2px 6px",
  fontSize: "11px",
  cursor: "pointer"
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // const updateStatus = async (id, status) => {
  //   try {
  //     await axios.put(`http://localhost:3000/api/orders/${id}`, {
  //       status
  //     });

  //     // update UI instantly
  //     setOrders((prev) =>
  //       prev.map((o) =>
  //         o._id === id ? { ...o, status } : o
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/api/orders/${id}`, {
        status
      });

      // update UI instantly
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#FFFAED",
        minHeight: "100vh"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#6A0610",
          fontWeight: 600,
          marginBottom: 3,
          letterSpacing: "0.2px"
        }}
      >
        Orders
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          boxShadow: "none",
          border: "1px solid #eadfdb",
          backgroundColor: "#fffdf8",
          overflow: "hidden"
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8ece8" }}>
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Order ID</TableCell>
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Total</TableCell>
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Items</TableCell>
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(106, 6, 16, 0.04)"
                  }
                }}
              >
                <TableCell
                  sx={{
                    fontSize: "12px",
                    color: "#6A0610",
                    borderColor: "#eadfdb"
                  }}
                >
                  {order._id}
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#6A0610",
                    borderColor: "#eadfdb"
                  }}
                >
                  Rs {order.totalPrice}
                </TableCell>

                <TableCell
                  sx={{
                    color: "#6A0610",
                    borderColor: "#eadfdb"
                  }}
                >
                  {order.orderItems.map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        fontSize: "13px",
                        lineHeight: 1.6
                      }}
                    >
                      {item.product?.name} × {item.quantity}
                    </Box>
                  ))}
                </TableCell>

                <TableCell sx={{ borderColor: "#eadfdb" }}>
                  <Chip
                    label={order.status || "pending"}
                    size="small"
                    sx={{
                      backgroundColor:
                        order.status === "delivered"
                          ? "#edf7ed"
                          : "#fff4e5",
                      color: "#6A0610",
                      fontWeight: 500,
                      textTransform: "capitalize",
                      borderRadius: "999px"
                    }}
                  />
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
