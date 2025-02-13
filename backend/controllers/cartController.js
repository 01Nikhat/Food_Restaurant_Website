import userModel from "../models/userModel.js";

//addTo cart add items to user cart
const addToCart = async(req,res) =>{
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1
    }
    else{
      cartData[req.body.itemId ] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    console.log("Updated cartData after adding item:", cartData); 
    res.json({success:true,message:"Added To Cart"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
  }
    
}

//remove item form userCart


// const removeFromCart = async(req,res) =>{
//   try {
//     let userData = await userModel.findById(req.body.userId);
//     let cartData = await userData.cartData;
//     if (cartData[req.body.itemId]>0) {
//       cartData[req.body.itemId] -= 1;
//     } 
//     await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//     res.json({success:true,message:"Remove From Cart"});


//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
    
//   }

// }

const removeFromCart = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = { ...userData.cartData }; // Create a shallow copy of cartData
    console.log("Current cartData:", cartData); // Debug line

    // Check if itemId exists in cartData and its quantity
    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1; // Decrement the quantity
      // If quantity is 0, remove the item from cartData
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }

      // Save updated cartData back to the database
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      return res.json({ success: true, message: "Removed from cart" });
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.json({ success: false, message: "Error occurred" });
  }
};



//fetch user cart data
const getCart = async(req,res)=>{
  try {
    let userData  = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
  }

}
export {addToCart,removeFromCart,getCart};