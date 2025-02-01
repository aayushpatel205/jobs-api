import express from "express";
import { createJob, getAllJobs, editJob, getJobById, deleteJob } from "../../controllers/jobs/jobs.js";

const router = express.Router();

router.post("/create", createJob);

router.get("/get-job", (req, res) => {
  res.status(200).send({ message: "Job fetched" });
});

router.get("/all-jobs", getAllJobs);
router.put("/edit-job/:id", editJob);
router.get("/get-job/:id", getJobById);
router.delete("/delete-job/:id", deleteJob);

export default router;
