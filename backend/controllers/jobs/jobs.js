import Job from "../../model/Job.js";

export const createJob = async (req, res) => {
  try {
    const { company, position, createdBy } = req.body;

    if (!company || !position) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const checkIfJobExists = await Job.findOne({ company, position });
    if (checkIfJobExists) {
      return res.status(400).send({ message: "Job already exists." });
    }

    const job = new Job({ company, position, createdBy });
    await job.save();
    return res.status(200).send({ message: "Job created successfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal server error." });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res
      .status(200)
      .send({ message: "Jobs fetched successfully.", jobs });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal server error." });
  }
};

export const editJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, position, status } = req.body;
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { company, position, status },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "Job updated successfully.", updatedJob });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal server error." });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    return res.status(200).send({ message: "Job fetched successfully.", job });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal server error." });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndDelete(id);
    return res.status(200).send({ message: "Job deleted successfully." });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error." });
  }
};
