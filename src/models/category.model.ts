import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
