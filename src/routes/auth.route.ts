import { Router } from "express";
import {
  authSateController,
  createCustomerController,
  createStaffController,
  genereteAccessToken,
  loginController,
} from "../controllers/auth.controller";
import { isAuthenticatedUser } from "../middlewares/auth";
const router = Router();
router.post("/register/customer", createCustomerController);
router.post("/register/staff", createStaffController);
router.post("/login", loginController);
router.get("/auth-state", isAuthenticatedUser, authSateController);
router.post("/refreshToken", genereteAccessToken);
const authRoute = router;
export default authRoute;
