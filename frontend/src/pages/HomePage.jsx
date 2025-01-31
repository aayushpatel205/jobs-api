import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, TextField } from "@mui/material";
import { createJob, editJobs, getJobs } from "../api/jobApis";

const HomePage = () => {
  const [job, setJob] = useState({
    company: "",
    position: "",
  });
  const [allJobs, setAllJobs] = useState();

  const getAllJobs = async () => {
    try {
      const data = await getJobs();
      console.log("The data is", data);
      setAllJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{ width: "40%", height: 330, borderRadius: 15, marginTop: 7 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: 23, fontWeight: "600" }}>New Job</p>
            <div>
              <p style={{ fontSize: 14 }}>Company</p>
              <TextField
                variant="outlined"
                style={{ width: 280 }}
                size="small"
                value={job.company}
                onChange={(e) => setJob({ ...job, company: e.target.value })}
              />
            </div>

            <div>
              <p style={{ fontSize: 14 }}>Position</p>
              <TextField
                variant="outlined"
                style={{ width: 280 }}
                size="small"
                value={job.position}
                onChange={(e) => setJob({ ...job, position: e.target.value })}
              />
            </div>
            <Button
              variant="contained"
              style={{ marginTop: 18 }}
              onClick={async () => {
                try {
                  if (!job.company || !job.position) {
                    return toast.warning("All fields are required");
                  }
                  const response = await createJob(job);
                  toast.success(response.message);
                  setJob({ company: "", position: "" });
                } catch (error) {
                  toast.error(error.response.data.message);
                }
              }}
            >
              Create new job
            </Button>
          </div>
        </Card>

        <div
          style={{
            display: "flex",
            width: "90%",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {allJobs &&
            allJobs.map((job) => {
              return (
                <Card
                  variant="outlined"
                  style={{
                    width: 290,
                    height: 130,
                    borderRadius: 15,
                    marginTop: 25,
                    padding: "0px 20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ fontSize: 20, marginBottom: -10 }}>
                    {job.position}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      backgroundColor: "#d3d3d3",
                      borderRadius: 7,
                      padding: "0px 7px",
                      display: "inline-block",
                      width: "fit-content",
                    }}
                  >
                    {job.company}
                  </p>

                  <div style={{ display: "flex", gap: 10 }}>
                    <Button
                      onClick={async() => {
                        const response = await editJobs(job, job._id);
                        toast.success(response.message);
                      }}
                      size="small"
                      sx={{
                        backgroundColor: "purple",
                        color: "white",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
