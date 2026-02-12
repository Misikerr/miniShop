# 🛒 Mini MERN E-Commerce App

Simple MERN stack e-commerce project for practicing full-stack fundamentals: authentication, authorization, CRUD, and protected routes.

Project structure:

```bash
/client   # User frontend (React + Vite)
/admin    # Admin frontend (React + Vite)
/server   # Backend API (Node.js + Express + MongoDB)
```

---

## 🚀 Features

### 👤 User App (`client`)

- Register and login with JWT
- View all products
- Add products to cart (stored in `localStorage`)
- Checkout and create orders
- JWT attached in `Authorization: Bearer <token>` via Axios interceptor

### 👑 Admin App (`admin`)

- Login as admin
- View product list
- Add products
- Delete products
- View all orders
- Admin-only protected pages

### 🔐 Authentication & Authorization

- JWT-based auth
- Password hashing with `bcryptjs`
- Route protection middleware
- Role-based access control (`user` vs `admin`)

---

## 🛠 Tech Stack

### Frontend (`client` + `admin`)

- React
- React Router
- Axios
- React Context API (auth state)
- `localStorage` (token/cart persistence)

### Backend (`server`)

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`

---

## 📦 Database Models

### User

- `name`
- `email`
- `password` (hashed)
- `role` (`user` or `admin`)

### Product

- `name`
- `description`
- `price`
- `image`
- `category` (optional)
- `stock` (optional)

### Order

- `user` (reference to `User`)
- `orderItems` (product snapshot + quantity)
- `totalPrice`
- `status`
- timestamps (`createdAt`, `updatedAt`)

---

## 🔌 API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Products

- `GET /api/products` (Public)
- `GET /api/products/:id` (Public)
- `POST /api/products` (Admin only)
- `DELETE /api/products/:id` (Admin only)

### Orders

- `POST /api/orders` (Authenticated user)
- `GET /api/orders/myorders` (Authenticated user)
- `GET /api/orders` (Admin only)

---

## ⚙️ Setup & Run

### 1) Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run server:

```bash
npm run dev
```

### 2) Seed Admin User (optional)

```bash
cd server
node seedAdmin.js
```

Default seeded admin:

- `admin@example.com`
- `admin123`

### 3) Client App

```bash
cd client
npm install
npm run dev
```

### 4) Admin App

```bash
cd admin
npm install
npm run dev
```

---

## 📌 Purpose

Built as a beginner-friendly but real-world structured MERN project to practice:

- full-stack app architecture
- JWT authentication flow
- role-based authorization
- frontend-backend API integration
