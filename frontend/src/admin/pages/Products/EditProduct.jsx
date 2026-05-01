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
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/products/${id}`
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
        "http://localhost:3000/api/uploads",
        formData
      );

      console.log(uploadRes.data);

      imageUrl = uploadRes.data.imageUrl;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/products/${id}`,
        {
          ...form,
          image: imageUrl,
          price: Number(form.price),
          quantity: Number(form.quantity)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFFAED",
        padding: { xs: 2, sm: 3, md: 4 }
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
        Edit Product
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "920px",
          border: "1px solid #eadfdb",
          backgroundColor: "#fffdf8",
          borderRadius: "10px",
          padding: { xs: 2, sm: 3 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2.2
        }}
      >
        <TextField
          name="sku"
          value={form.sku}
          onChange={handleChange}
          label="SKU"
          fullWidth
          sx={fieldStyles}
        />

        <TextField
          name="name"
          value={form.name}
          onChange={handleChange}
          label="Name"
          fullWidth
          sx={fieldStyles}
        />

        <TextField
          name="price"
          value={form.price}
          onChange={handleChange}
          label="Price"
          fullWidth
          sx={fieldStyles}
        />

        <FormControl fullWidth sx={fieldStyles}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={form.category}
            onChange={handleChange}
            label="Category"
             MenuProps={{
                          slotProps: {
                            list: {
                              sx: {
                                display: "flex",
                                flexDirection: "column",
                                width: "30%"
                              },
                            },
                          },
                          PaperProps: {
                            sx: {
                              "& .MuiMenuItem-root": {
                                display: "block",
                                width: "30%"
                              },
                            },
                          },
                        }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography
            sx={{
              color: "#6A0610",
              fontSize: "13px",
              marginBottom: 1
            }}
          >
            Product Image
          </Typography>
          <Box
            sx={{
              border: "1px solid #d9c9c5",
              borderRadius: "6px",
              backgroundColor: "#fffdf8",
              padding: "11px 14px",
              color: "#6A0610"
            }}
          >
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{
                width: "100%",
                color: "#6A0610",
                // margin-right: "10px"
              }}
            />
          </Box>
        </Box>

        <TextField
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          label="Quantity"
          fullWidth
          sx={fieldStyles}
          style={{marginTop: "18px"}}
        />

        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField
            fullWidth
            name="description"
            value={form.description}
            onChange={handleChange}
            label="Description"
            multiline
            rows={4}
            sx={fieldStyles}
          />
        </Box>

        <Box sx={{ gridColumn: "1 / -1", marginTop: 1 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#6A0610",
              color: "#fff",
              textTransform: "none",
              borderRadius: "6px",
              paddingX: 2.4,
              paddingY: 1.1,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#4f040c",
                boxShadow: "none"
              }
            }}
          >
            Update Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fffdf8",
    borderRadius: "6px",
    "& fieldset": {
      borderColor: "#d9c9c5"
    },
    "&:hover fieldset": {
      borderColor: "#6A0610"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6A0610"
    }
  },
  "& .MuiInputLabel-root": {
    color: "#6A0610"
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6A0610"
  },
  "& .MuiInputBase-input": {
    color: "#6A0610"
  }
};

export default EditProduct;
