import express from "express";
import { registerUser , loginUser } from "../../controllers/user/user.js";

const router = express.Router();

router.post("/auth/register", registerUser);

router.get("/auth/login", loginUser);

export default router;