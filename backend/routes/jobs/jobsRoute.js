import express from "express";
import { createJob } from "../../controllers/jobs/jobs.js";

const router = express.Router();

router.post("/create",createJob);

router.get("/get-job",(req,res)=>{
    res.status(200).send({message: "Job fetched"});
});

export default router;

