import { Router } from "express";
import authController from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", verifyToken, authController.checkAuth);

export default router;
