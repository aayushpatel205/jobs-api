import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, TextField } from "@mui/material";
import { createJob, deleteJobById, getJobs } from "../api/jobApis";
import { Link } from "react-router-dom";

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
      setAllJobs(data || []); // Ensure empty array if data is undefined
    } catch (error) {
      console.log(error);
      setAllJobs([]); // Set empty array to avoid undefined issues
    }
  };
  

  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
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
          {allJobs?.length > 0 &&
            allJobs.map((job) => {
              let statusColor = "#ffc107";
              if(job.status === "interview"){
                  statusColor = "green";
              }else if(job.status === "declined"){
                  statusColor = "red";
              }
              return (
                <Card
                  variant="outlined"
                  style={{
                    width: 310,
                    height: 200,
                    borderRadius: 15,
                    marginTop: 25,
                    padding: "0px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p
                      style={{
                        fontSize: 20,
                        marginBottom: -10,
                        fontWeight: 600,
                        maxWidth: 280,
                      }}
                    >
                      {job.position}
                    </p>
                    <div style={{display: 'flex',gap: 5}}>
                      <p>Status:</p>
                      <p style={{color: statusColor,fontWeight: 600}}>{job.status}</p>
                    </div>
                    <p
                      style={{
                        fontSize: 15,
                        backgroundColor: "#d3d3d3",
                        borderRadius: 5,
                        padding: "0px 7px",
                        display: "inline-block",
                        width: "fit-content",
                        maxWidth: 280
                      }}
                    >
                      {job.company}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <Link
                      to={`/jobs/edit-job/${job._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          fontWeight: 500,
                          color: "green",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </p>
                    </Link>

                    <p
                      style={{
                        fontWeight: 500,
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={async()=>{
                          try {
                            const response = await deleteJobById(job._id);
                            toast.success(response.message);
                          } catch (error) {
                            toast.error(error.response.data.message);
                          }
                      }}
                    >
                      Delete
                    </p>
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
