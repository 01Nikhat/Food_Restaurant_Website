// // orderArchiver.js
// import orderModel from "../models/orderModel.js";
// import orderHistoryModel from "../models/orderHistoryModel.js";
// import cron from 'node-cron';

// // Schedule to run once a day at midnight
// cron.schedule('0 0 * * *', async () => {
//   try {
//    // const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//    const oneDayAgo = new Date(Date.now() - 5 * 1000); // 5 seconds ago


//     // Find all delivered orders older than 1 day
//     const oldOrders = await orderModel.find({
//       status: 'delivered',
//       updatedAt: { $lt: oneDayAgo }
//     });

//     // Move each order to the orderHistory collection
//     for (let order of oldOrders) {
//       const archivedOrder = new orderHistoryModel(order.toObject());
//       await archivedOrder.save();
//       await orderModel.findByIdAndDelete(order._id);
//     }

//     console.log('Archived delivered orders older than 1 day');
//   } catch (error) {
//     console.error('Error archiving orders:', error);
//   }
// });
