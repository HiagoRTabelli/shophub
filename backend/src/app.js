const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (Postman, Thunder Client)
      if (!origin) {
        return callback(null, true);
      }

      // Permite localhost
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Permite qualquer deploy da Vercel
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ShopHub API is running" });
});

module.exports = app;