import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
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

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
