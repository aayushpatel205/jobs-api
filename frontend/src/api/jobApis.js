import axios from "axios";

export const createJob = async (job) => {
  const newJob = {...job, createdBy: sessionStorage.getItem("user_id")};
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:8000/jobs/create",
      newJob,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
