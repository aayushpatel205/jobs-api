import React, { useEffect, useState } from "react";
import { Card, TextField, Select, MenuItem, Button } from "@mui/material";
import { useParams , useNavigate } from "react-router-dom";
import { editJobs, getJobById } from "../api/jobApis";
import { toast, ToastContainer } from "react-toastify";


const EditPage = () => {
  const navigate = useNavigate();
  const jobStatusArray = ["interview", "declined", "pending"];
  const [job, setJob] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const { id } = useParams();

  const getJob = async () => {
    const data = await getJobById(id);
    setJob(data);
    setJobStatus(data.status);
  };

  useEffect(() => {
    getJob();
  }, []);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        variant="outlined"
        style={{
          width: "27%",
          borderRadius: 15,
          marginTop: 30,
          height: 490,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 35, fontWeight: 600 }}>Edit User.</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            marginTop: -20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Company</p>
            <TextField
              size="small"
              variant="outlined"
              style={{ width: 280 }}
              value={job ? job.company : ""}
              onChange={(e) => {
                setJob({ ...job, company: e.target.value });
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Position</p>
            <TextField
              size="small"
              variant="outlined"
              style={{ width: 280 }}
              value={job ? job.position : ""}
              onChange={(e) => {
                setJob({ ...job, position: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Status</p>
            <Select
              size="small"
              style={{ width: 190 }}
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value)}
            >
              {jobStatusArray.map((element, key) => {
                return (
                  <MenuItem value={element} key={key}>
                    {element}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>

        <Button
          variant="contained"
          style={{ marginTop: 15 }}
          onClick={async () => {
            try {
              if (job.company === "" || job.position === "" || jobStatus === "")
                return toast.warning("All fields are required.");

              const updatedJob = { ...job, status: jobStatus };
              const data = await editJobs(updatedJob, id);
              toast.success(data.message);
              navigate("/jobs/home");
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          Edit Job
        </Button>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default EditPage;
