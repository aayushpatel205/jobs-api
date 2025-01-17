import express from "express";
import connectDatabase from "./database/connect.js";

const app = express();

const PORT = 8000;

app.use(express.json());

connectDatabase();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});