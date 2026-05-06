import { useEffect, useState } from "react";
import axios from "axios";
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
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products/${id}`
      );

      setForm({
        ...res.data,
        category: res.data.category._id
      });
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.image;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/uploads`,
        formData
      );

      imageUrl = uploadRes.data.imageUrl;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/products/${id}`,
        {
          ...form,
          image: imageUrl,
          price: Number(form.price),
          quantity: Number(form.quantity)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="editContainer">

      <Typography className="editTitle">
        Edit Product
      </Typography>

      <Box component="form" onSubmit={handleSubmit} className="editForm">

        <TextField name="sku" value={form.sku} onChange={handleChange} label="SKU" fullWidth className="field" />
        <TextField name="name" value={form.name} onChange={handleChange} label="Name" fullWidth className="field" />
        <TextField name="price" value={form.price} onChange={handleChange} label="Price" fullWidth className="field" />

        <FormControl fullWidth className="field">
          <InputLabel>Category</InputLabel>
          <Select name="category" value={form.category} onChange={handleChange} label="Category">
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box className="fileBox">
          <Typography className="fileLabel">Product Image</Typography>
          <Box className="fileInputBox">
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
          </Box>
        </Box>

        <TextField name="quantity" value={form.quantity} onChange={handleChange} label="Quantity" fullWidth className="field fullRow" />

        <TextField
          fullWidth
          name="description"
          value={form.description}
          onChange={handleChange}
          label="Description"
          multiline
          rows={4}
          className="field fullRow"
        />

        <Box className="btnRow">
          <Button type="submit" className="submitBtn">
            Update Product
          </Button>
        </Box>

      </Box>

    </Box>
  );
};

export default EditProduct;