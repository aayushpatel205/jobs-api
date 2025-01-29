import express from "express";
import connectDatabase from "./database/connect.js";
import AuthRoutes from "./routes/auth/authRoute.js";
import JobRoutes from "./routes/jobs/jobsRoute.js";
import cors from "cors";
import { jwtAuthMiddleware } from "./jwt.js";

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());


app.use("/auth", AuthRoutes);
app.use("/jobs", jwtAuthMiddleware , JobRoutes);

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
