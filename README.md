# 🛍️ E-Commerce Web Application (MERN Stack)

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js).  
It includes a customer shopping interface and a complete admin dashboard for product and order management.

---

## 🚀 Features

### 👤 Customer Side
- View products
- Category filtering
- Product details page
- Add to cart
- Update cart quantity
- Checkout system
- Login / Signup authentication

### 🛠️ Admin Panel
- Admin dashboard
- Add / Edit / Delete products
- Upload product images (Cloudinary)
- Manage orders
- Update order status (pending, processing, delivered, cancelled)

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Material UI (MUI)
- CSS / CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js
- Multer
- Cloudinary

---

## 🔐 Authentication System

- JWT-based login system
- Password hashing using bcrypt
- Role-based access control:
  - Admin → full access
  - Customer → shopping only
- Protected routes using middleware

---

## 📦 Core Modules

### Users
- Signup
- Login
- Get logged-in user (`/me`)

### Products
- Create product (admin only)
- Update product
- Delete product
- Fetch all products
- Image upload via Cloudinary

### Orders
- Place order
- Fetch orders (admin)
- Update order status

### Cart
- Frontend cart state
- Quantity updates
- Checkout integration

---

## 🖼️ Image Upload Flow

1. Admin selects image in form
2. Image sent to backend using FormData
3. Multer handles file upload
4. Cloudinary stores image
5. URL returned and saved in database

---

## 🔑 Environment Variables

Create `.env` file in backend:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Run Project

### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
frontend/
  components/
  pages/
  context/
  layouts/

backend/
  controllers/
  models/
  routes/
  middleware/
```

---

## 🔒 Protected Routes

- Admin routes require:
  - Valid JWT token
  - Role = admin

Middleware used:
- authMiddleware
- adminMiddleware

---

## ⚠️ Notes

- Cart is frontend-based (not stored in DB)
- Cloudinary used for image storage
- Orders are manually updated by admin
- JWT stored in localStorage

---

## 📌 Future Improvements

- Persistent cart (DB-based)
- Payment gateway integration
- Email notifications
- Better analytics dashboard
- Order tracking system

---

## 👨‍💻 Author

Built as a MERN stack learning project focusing on real-world e-commerce architecture.
