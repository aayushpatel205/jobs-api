import express from "express";
import { createJob, getAllJobs, editJob } from "../../controllers/jobs/jobs.js";

const router = express.Router();

router.post("/create", createJob);

router.get("/get-job", (req, res) => {
  res.status(200).send({ message: "Job fetched" });
});

router.get("/all-jobs", getAllJobs);
router.put("/edit-job/:id", editJob);

export default router;
