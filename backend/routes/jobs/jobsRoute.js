import express from "express";

const router = express.Router();

router.put("/edit",(req,res)=>{
    res.status(200).send({message:"Job edited"});
});

router.get("/get-job",(req,res)=>{
    res.status(200).send({message: "Job fetched"});
});

export default router;

