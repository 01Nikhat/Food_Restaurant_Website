import mongoose from "mongoose";

export const connectDB = async () =>{
  await mongoose.connect('mongodb+srv://nikhatparvin:7687829892@cluster0.n7hc6.mongodb.net/food_website').then(()=>console.log("DB Connected"));
}
