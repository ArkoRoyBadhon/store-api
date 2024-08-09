import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
