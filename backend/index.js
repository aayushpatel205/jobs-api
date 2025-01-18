import express from "express";
import connectDatabase from "./database/connect.js";
import AuthRoutes from "./routes/auth/authRoute.js";
import cors from "cors";

const app = express();

const PORT = 8000;


app.use(cors());
app.use(express.json());

app.use("/",AuthRoutes);
connectDatabase();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});