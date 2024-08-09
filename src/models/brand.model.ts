import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
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

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
