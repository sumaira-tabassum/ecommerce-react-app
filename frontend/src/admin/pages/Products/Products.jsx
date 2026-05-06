import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
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
    <Box className="productsContainer">

      <Box className="productsHeader">
        <Typography className="productsTitle">
          Manage Products
        </Typography>

        <Link to="/admin/products/add" className="addLink">
          <Button className="addBtn">
            Add Product
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} className="tableContainer">
        <Table>

          <TableHead>
            <TableRow className="tableHeadRow">
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} className="tableRow">

                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="productImg"
                  />
                </TableCell>

                <TableCell>{product.name}</TableCell>
                <TableCell>Rs {product.price}</TableCell>
                <TableCell>{product.category?.name}</TableCell>

                <TableCell className="actionsCell">
                  <Link to={`/admin/products/edit/${product._id}`}>
                    <EditIcon className="editIcon" />
                  </Link>

                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleDelete(product._id)}
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

export default Products;