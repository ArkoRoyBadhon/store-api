import bcrypt from "bcrypt";
import mongoose from "mongoose";

const AuthenticationSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["owner", "staff", "customer"],
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

AuthenticationSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const Authentication = mongoose.model("Authentication", AuthenticationSchema);

export default Authentication;
