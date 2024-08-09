import { Router } from "express";

import { updateCustomerDetails } from "../controllers/customer.controller";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth";
const router = Router();
router.put(
  "/update",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  updateCustomerDetails
);

const customerRoute = router;
export default customerRoute;
