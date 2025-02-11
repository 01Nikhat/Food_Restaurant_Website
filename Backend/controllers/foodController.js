import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";


//add food item

const addFood = async(req,res) =>{
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename

  })
  try{
    //savin in DB
    await food.save();
    res.json({success:true,message:"Food Added"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

//all food list
const listFood = async (req,res) =>{
  try {
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

//remove food item 

const removeFood = async (req,res) =>{
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"food removed"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

export{addFood,listFood,removeFood}




// controllers/foodController.js

// import foodModel from "../models/foodModel.js";  // Import foodModel
// import fs from "fs";  // File system to handle image deletion

// // Add food item
// const addFood = async (req, res) => {
//   try {
//     // Ensure that file is uploaded properly
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "Image is required" });
//     }

//     // Ensure that all required fields are provided
//     if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Extract the filename for the image
//     let image_filename = req.file.filename;

//     // Create a new food item
//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       image: image_filename
//     });

//     // Save the food item to the database
//     await food.save();

//     res.json({ success: true, message: "Food Added", food: food });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error occurred while adding food" });
//   }
// };


// // List all food items
// const listFood = async (req, res) => {
//   try {
//     const foods = await foodModel.find({}); // Get all food items from the database
//     res.json({ success: true, data: foods });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error occurred while fetching food items" });
//   }
// };

// // Remove food item
// const removeFood = async (req, res) => {
//   try {
//     const food = await foodModel.findById(req.body.id); // Find the food item by its ID

//     if (!food) {
//       return res.status(404).json({ success: false, message: "Food item not found" });
//     }

//     // Delete the image from the server
//     fs.unlink(`uploads/${food.image}`, (err) => {
//       if (err) console.log("Error deleting image:", err);
//     });

//     // Delete the food item from the database
//     await foodModel.findByIdAndDelete(req.body.id);

//     res.json({ success: true, message: "Food item removed" });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error occurred while removing food item" });
//   }
// };

// export { addFood, listFood, removeFood };
