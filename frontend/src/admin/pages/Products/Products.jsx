import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products`);
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#FFFAED",
        minHeight: "100vh"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#6A0610",
            fontWeight: 600,
            letterSpacing: "0.2px"
          }}
        >
          Manage Products
        </Typography>

        <Link to="/admin/products/add" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6A0610",
              color: "#fff",
              textTransform: "none",
              borderRadius: "6px",
              paddingX: 2.2,
              paddingY: 1.1,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#4f040c",
                boxShadow: "none"
              }
            }}
          >
            Add Product
          </Button>
        </Link>
      </Box>

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
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ color: "#6A0610", fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell sx={{ borderColor: "#eadfdb" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    width="52"
                    height="52"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </TableCell>

                <TableCell sx={{ color: "#6A0610", borderColor: "#eadfdb" }}>
                  {product.name}
                </TableCell>

                <TableCell sx={{ color: "#6A0610", borderColor: "#eadfdb" }}>
                  Rs {product.price}
                </TableCell>

                <TableCell sx={{ color: "#6A0610", borderColor: "#eadfdb" }}>
                  {product.category?.name}
                </TableCell>

                <TableCell sx={{ borderColor: "#eadfdb" }}>
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    style={{ textDecoration: "none", marginRight: "8px" }}
                  >
                    {/* <Button
                      size="small"
                      sx={{
                        color: "#6A0610",
                        border: "1px solid #6A0610",
                        textTransform: "none",
                        borderRadius: "6px",
                        minWidth: "70px",
                        "&:hover": {
                          backgroundColor: "#6A0610",
                          color: "#fff",
                          borderColor: "#6A0610"
                        }
                      }}
                    > */}
                    <EditIcon
                      fontSize="small"
                      sx={{
                        marginRight: "5px",
                        color: "#6A0610",
                      }}>
                    </EditIcon>
                    {/* Edit
                    </Button> */}
                  </Link>

                  {/* <Button
                    size="small"
                    
                    sx={{
                      color: "#b42318",
                      border: "1px solid #e7b3ae",
                      textTransform: "none",
                      borderRadius: "6px",
                      minWidth: "70px",
                      "&:hover": {
                        backgroundColor: "#fff1f0",
                        borderColor: "#d92d20"
                      }
                    }}
                  > */}
                  <DeleteForeverIcon
                    fontSize="small"

                    sx={{
                      marginRight: "5px",
                      color: "#b42318",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#fff1f0",
                        borderColor: "#d92d20"
                      }
                    }}
                    onClick={() => handleDelete(product._id)} />
                  {/* Delete
                  </Button> */}

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Products;
