import Job from "../../model/Job.js";

export const createJob = async (req, res) => {
  try {
    const { company, position , createdBy } = req.body;
    console.log("company from backend: ",company);
    console.log("position from backend: ",position);

    if (!company || !position) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const checkIfJobExists = await Job.findOne({ company, position });
    if (checkIfJobExists) {
      return res.status(400).send({ message: "Job already exists." });
    }

    const job = new Job({ company, position , createdBy});
    await job.save();
    return res.status(200).send({ message: "Job created successfully." });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal server error." });
  }
};
