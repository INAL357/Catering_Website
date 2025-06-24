import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dishPhoto : { type: String },
  type: { type: String, required: true },
  price: { type: Number },
}, { timestamps: true });

export default mongoose.model("Dish", DishSchema);
