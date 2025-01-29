import express from "express";
import { registerUser , loginUser } from "../../controllers/user/user.js";

const router = express.Router();

router.post("/register", registerUser);

router.get("/login",loginUser);

export default router;