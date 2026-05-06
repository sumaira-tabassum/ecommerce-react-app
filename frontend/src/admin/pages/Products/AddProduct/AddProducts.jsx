import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    quantity: ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories`);
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/uploads`,
          formData
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/products`,
        { ...form, image: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product added");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="addProductContainer">

      <Typography className="addProductTitle">
        Add Product
      </Typography>

      <Box component="form" onSubmit={handleSubmit} className="addProductForm">

        <TextField name="sku" label="SKU" value={form.sku} onChange={handleChange} fullWidth className="field" />
        <TextField name="name" label="Name" value={form.name} onChange={handleChange} fullWidth className="field" />
        <TextField name="price" label="Price" type="number" value={form.price} onChange={handleChange} fullWidth className="field" />

        <FormControl fullWidth className="field">
          <InputLabel>Category</InputLabel>
          <Select name="category" value={form.category} label="Category" onChange={handleChange}>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box className="fileBox">
          <Typography className="fileLabel">Product Image</Typography>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </Box>

        <TextField
          name="quantity"
          label="Quantity"
          value={form.quantity}
          onChange={handleChange}
          fullWidth
          className="field fullRow"
        />

        <TextField
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          className="field fullRow"
        />

        <Box className="buttonRow">
          <Button type="submit" variant="contained" className="submitBtn">
            Add Product
          </Button>
        </Box>

      </Box>

    </Box>
  );
};

export default AddProduct;