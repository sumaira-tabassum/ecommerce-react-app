# 🛍️ E-Commerce Web Application

A full-stack e-commerce app with a customer storefront and an admin dashboard for managing products, categories and orders.

The React frontend talks to a **Node.js / Express** REST API backed by MongoDB. The same API is also implemented in **Python (FastAPI)** in [`backend-py/`](backend-py), and the repo includes **Terraform** for provisioning AWS infrastructure.

**Live demo:** _frontend URL_ · **API:** _backend URL_

---

## 🚀 Features

### 👤 Customer
- Browse products and filter by category
- Product details page
- Cart with quantity updates
- Checkout with billing and shipping details
- Order confirmation email (EmailJS)
- Login / signup

### 🛠️ Admin
- Admin dashboard
- Add, edit and delete products
- Product image upload (Cloudinary)
- Manage categories
- View orders and update their status (pending, processing, delivered, cancelled)

---

## 🧑‍💻 Tech Stack

| Layer | Tech |
| --- | --- |
| Frontend | React 19, Vite, React Router, Axios, Material UI, SweetAlert2 |
| Backend (main) | Node.js, Express 5, MongoDB + Mongoose, JWT, bcrypt, Multer, Cloudinary, EmailJS |
| Backend (Python) | FastAPI, Motor + Beanie (MongoDB), PyJWT, passlib |
| Infrastructure | Vercel, Docker, Terraform (AWS EC2 + S3) |

---

## 📁 Project Structure

```
frontend/      React app (Vite)
backend/       Node.js / Express API (used by the frontend)
backend-py/    Python / FastAPI version of the same API
terraform/     AWS infrastructure (EC2 instance + S3 static site)
```

---

## ▶️ Run Locally

### 1. Backend (Node.js)
```bash
cd backend
cp .env.example .env    # fill in the values
npm install
npm start               # http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env    # VITE_BASE_URL=http://localhost:5000
npm install
npm run dev
```

### Optional: Python backend
```bash
cd backend-py
python -m venv venv
venv\Scripts\activate          # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 5000
```
It exposes the same `/api/*` routes, so the frontend can point at it by changing `VITE_BASE_URL`.

---

## 🔑 Environment Variables

`backend/.env` (same keys for `backend-py/.env`):

```
MONGO_URI=            # MongoDB connection string
PORT=5000
JWT_SECRET=

CLOUD_NAME=           # Cloudinary
API_KEY=
API_SECRET=

EMAILJS_PUBLIC_KEY=   # EmailJS (order confirmation emails)
EMAILJS_PRIVATE_KEY=
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
```

`frontend/.env`:
```
VITE_BASE_URL=http://localhost:5000
```

An admin account is created automatically the first time the API starts (see `backend/utils/seedAdmin.js`).

---

## ☁️ Deployment

Both apps are deployed on Vercel as two separate projects from this repo:

- **API:** root directory `backend`. [`backend/vercel.json`](backend/vercel.json) runs the Express app as a serverless function. Add the backend environment variables in the Vercel project settings.
- **Frontend:** root directory `frontend`, with `VITE_BASE_URL` set to the API URL. [`frontend/vercel.json`](frontend/vercel.json) handles client-side routing.
- **AWS (Terraform):** [`terraform/`](terraform) provisions an EC2 instance for the API and an S3 bucket for the static frontend. The API also ships with a [`Dockerfile`](backend/Dockerfile).

---

## 🔐 Auth and Access Control

- JWT-based login, passwords hashed with bcrypt
- Roles: **admin** (full access) and **customer** (shopping only)
- Admin routes are protected by `authMiddleware` + `adminMiddleware`

---

## 🖼️ Image Upload Flow

1. Admin picks an image in the product form
2. The image is sent to the API as `FormData`
3. Multer receives the file
4. It's uploaded to Cloudinary
5. The returned URL is saved on the product

---

## 📌 Future Improvements

- Store the cart in the database
- Payment gateway integration
- Customer order tracking
- Richer analytics dashboard
