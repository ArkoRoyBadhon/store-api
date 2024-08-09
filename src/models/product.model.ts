import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  service: {
    type: Object || String,
    // required: true,
  },

  averageRating: {
    type: Number,
    required: false,
    default: 0,
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Tag",
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
