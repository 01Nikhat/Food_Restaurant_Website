// import express from "express";
// import multer from "multer";
// import { addFood, listFood ,removeFood} from "../controllers/foodController.js";

// const foodRouter = express.Router();

// //image storage engine

// const storage = multer.diskStorage({
//   destination:"uploads",
//   filename:(req,file,cb) =>{
//       return cb(null,`${Date.now()}${file.originalname}`)
//   }
// })

// const upload = multer({storage:storage})

// foodRouter.post("/add",upload.single("image"),addFood)
// foodRouter.get("/list",listFood)
// foodRouter.post("/remove",removeFood);







// export default foodRouter;




// routes/foodRoutes.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';

const router = express.Router();

// Set up multer storage to save the uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Files will be saved to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Add a timestamp to the filename
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Route to add food item (with file upload handling)
router.post('/add', upload.single('image'), addFood);

// Route to list all food items
router.get('/list', listFood);

// Route to remove a food item
router.delete('/remove', removeFood);

export default router;
