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

const getStatusStyles = (status) => {
  const styles = {
    pending: {
      // backgroundColor: "#fff4e5",
      color: "#9a5b00"
    },
    processing: {
      // backgroundColor: "#e8f1ff",
      color: "#1d4ed8"
    },
    "in transit": {
      // backgroundColor: "#f1ebff",
      color: "#6d28d9"
    },
    delivered: {
      // backgroundColor: "#edf7ed",
      color: "#1f7a1f"
    },
    cancelled: {
      // backgroundColor: "#fdecec",
      color: "#b42318"
    }
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
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
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
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Order Number</TableCell>
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
                  {order.orderNumber}
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
                    borderColor: "#eadfdb",
                    verticalAlign: "top"
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

                <TableCell
                  sx={{
                    borderColor: "#eadfdb",
                    verticalAlign: "top",
                    width: "170px",
                    paddingTop: 2
                  }}
                >
                  <FormControl size="small" fullWidth>
                    <Select
                      value={order.status || "pending"}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      disabled={updatingOrderId === order._id}
                      displayEmpty
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            "& .MuiMenuItem-root": {
                              display: "block"
                            }
                          }
                        }
                      }}
                      sx={{
                        color: "#6A0610",
                        backgroundColor: getStatusStyles(order.status || "pending").backgroundColor,
                        color: getStatusStyles(order.status || "pending").color,
                        borderRadius: "8px",
                        textTransform: "capitalize",
                        fontSize: "13px",
                        minHeight: "36px",
                        "& .MuiSelect-select": {
                          padding: "8px 28px 8px 12px",
                          display: "flex",
                          alignItems: "center"
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d9c9c5"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#6A0610"
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#6A0610"
                        }
                      }}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem
                          key={status}
                          value={status}
                          sx={{
                            fontSize: "13px",
                            minHeight: "34px",
                            // width: "100%",
                            // height: "100%",
                            textTransform: "capitalize",
                            ...getStatusStyles(status)
                          }}
                        >
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
