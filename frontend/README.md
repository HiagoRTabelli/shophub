# 🛍️ ShopHub

A modern full-stack e-commerce application built to demonstrate real-world development skills using React, Node.js, PostgreSQL, and Prisma.

## 🚀 Live Demo

* **Frontend:** https://shophub-b26r293pr-hiago-s-projects1.vercel.app
* **Backend API:** https://shophub-backend-3cgm.onrender.com

---

## 📌 Overview

ShopHub is a responsive e-commerce platform featuring product browsing, shopping cart functionality, checkout flow, order management, and an administrative dashboard for managing products and customer orders.

The project was developed following modern development practices with a mobile-first approach and a clean user interface based on a yellow, white, and black design system.

---

## ✨ Features

### Customer Features

* Browse products
* Search products by name
* Filter products by category
* View detailed product information
* Add products to cart
* Manage cart quantities
* Checkout with shipping information
* View order confirmation page
* Track order history
* JWT Authentication

### Admin Features

* Create new products
* Edit existing products
* Delete products
* Manage inventory stock
* View all customer orders
* Filter and search orders
* Update order status:

  * Pending
  * Paid
  * Preparing
  * Shipped
  * Delivered
  * Cancelled

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Tailwind CSS
* Axios
* Context API
* React Hot Toast

### Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL (Neon)
* JWT Authentication
* bcrypt
* CORS

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Neon PostgreSQL

---

## 📱 Responsive Design

The application was built using a mobile-first approach and is fully responsive across:

* Mobile devices
* Tablets
* Desktop screens

---

## 🔐 Authentication

ShopHub uses JWT-based authentication.

Features include:

* User registration
* User login
* Protected routes
* Admin-only routes
* Persistent authentication using Local Storage

---

## 📦 Order Workflow

Customer Flow:

Home → Product Details → Cart → Checkout → Order Success → My Orders

Admin Flow:

Dashboard → Product Management → Order Management

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/shophub.git
cd shophub
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Run migrations:

```bash
npx prisma migrate deploy
npx prisma generate
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Update API URL:

```javascript
baseURL: "http://localhost:3000/api"
```

Start frontend:

```bash
npm run dev
```

---

## 📷 Screenshots

* Home Page
* Product Details
* Shopping Cart
* Checkout
* Order Success
* My Orders
* Admin Products Dashboard
* Admin Orders Dashboard

---

## 🎯 Learning Outcomes

This project strengthened my knowledge in:

* Full-stack application development
* REST API design
* Authentication and authorization
* Database modeling with Prisma
* State management with Context API
* Responsive UI development
* Deployment workflows using Render, Vercel, and Neon

---

## 👨‍💻 Author

**Hiago Tabelli**

* LinkedIn: https://linkedin.com/in/YOUR_LINKEDIN
* GitHub: https://github.com/YOUR_GITHUB

---

## 📄 License

This project was created for educational and portfolio purposes.
