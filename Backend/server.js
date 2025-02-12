import express from "express";
import cors from "cors";
import Razorpay from 'razorpay';  // Ensure this is correctly imported
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";  // Ensure this is imported correctly
import "dotenv/config";
// index.js or app.js



// Razorpay instance setup
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Correct the key secret variable name if necessary
});

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
