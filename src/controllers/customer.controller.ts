import catchAsyncError from "../middlewares/catchAsyncErrors";
import Customer from "../models/customer.model";
import sendResponse from "../utils/sendResponse";

export const updateCustomerDetails = catchAsyncError(async (req, res) => {
  const { body } = req;
  const user = req.user;
  if (!user) return res.status(204).json({});

  const isExistCustomer = await Customer.findOne({ email: user.email });
  if (!isExistCustomer) {
    return sendResponse(res, {
      success: false,
      message: "customer does't exist",
      data: null,
    });
  }

  const result = await Customer.findByIdAndUpdate(isExistCustomer._id, body, {
    new: true,
    runValidators: true,
  });
  sendResponse(res, {
    success: true,
    message: "User details update successfull",
    data: result,
  });
});
