// // import express from "express";
// // import { placeOrder, verifyPayment } from "../controllers/orderController.js";
// // import authMiddleware from "../middleware/auth.js";

// // const orderRouter = express.Router();

// // orderRouter.post("/place", authMiddleware, placeOrder);
// // orderRouter.post("/verify", verifyPayment);
// // //orderRouter.get("userorders",authMiddleware,userOrders)

// // export default orderRouter;

// import express from "express";
// import { placeOrder, verifyPayment, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";
// import authMiddleware from "../middleware/auth.js";

// const orderRouter = express.Router();

// orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/verify", verifyPayment);
// orderRouter.get("/userorders", authMiddleware, userOrders);
// orderRouter.get("/list",listOrders)
// orderRouter.post("/status", updateStatus);

// export default orderRouter;


import express from "express"
import {
  placeOrder,
  verifyPayment,
  userOrders,
  listOrders,
  updateStatus,
  clearCart,
} from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js"

const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", verifyPayment)
orderRouter.get("/userorders", authMiddleware, userOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)
orderRouter.post("/cart/clear", authMiddleware, clearCart)

export default orderRouter

