import axios from "axios";

const token = sessionStorage.getItem("token");
export const createJob = async (job) => {
  const newJob = { ...job, createdBy: sessionStorage.getItem("user_id") };
  try {
    const response = await axios.post(
      "http://localhost:8000/jobs/create",
      newJob,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Couldn't create job", error);
  }
};

export const getJobs = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const data = await axios.get("http://localhost:8000/jobs/all-jobs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.data.jobs;
  } catch {
    console.log("Couldn't find jobs");
  }
};

export const getJobById = async (id) => {
  try {
    const data = await axios.get(`http://localhost:8000/jobs/get-job/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data?.data.job;
  } catch {
    console.log("Couldn't find the requested job!!");
  }
};

export const editJobs = async (job, id) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/jobs/edit-job/${id}`,
      job,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Couldn't edit job", error);
  }
};

export const deleteJobById = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/jobs/delete-job/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Couldn't delete job", error);
  }
};
