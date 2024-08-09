import mongoose from "mongoose";

const staffScheam = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
});

const Staff = mongoose.model("Staff", staffScheam);
export default Staff;
