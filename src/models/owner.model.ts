import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
