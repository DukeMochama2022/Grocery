const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/authRoutes");
const { adminRouter } = require("./routes/adminRoutes");
const { categoryRouter } = require("./routes/categoryRoutes");
const { productRouter } = require("./routes/productRoutes");
const { dashboardRouter } = require("./routes/dashboardRoutes");
const { addressRouter } = require("./routes/addressRoutes");
const {orderRouter}=require("./routes/orderRoutes")

require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;
connectDB();

//API endpoints
app.get("/", (req, res) => {
  res.send("Api working.");
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/address", addressRouter);
app.use("/api/order",orderRouter)

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
