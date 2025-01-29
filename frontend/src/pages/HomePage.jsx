import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, TextField } from "@mui/material";
import { createJob } from "../api/jobApis";

const HomePage = () => {
  const [job, setJob] = useState({
    company: "",
    position: ""
  });
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{ width: "40%", height: 340, borderRadius: 15, marginTop: 40 }}
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
                  const response = await createJob(job);
                  toast.success(response.message);
                } catch (error) {
                  toast.error(error.response.data.message);
                }
                
              }}
            >
              Create new job
            </Button>
          </div>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
