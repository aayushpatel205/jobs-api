import React, { useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApis";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" style={{ width: "27%", borderRadius: 15 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 35, fontWeight: 600 }}>Login User.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <TextField
              label="Email"
              variant="outlined"
              style={{ width: 280 }}
              size="small"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              style={{ width: 280 }}
              size="small"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />

            <Button
              variant="contained"
              onClick={async () => {
                try {
                  if (!userDetails.email || !userDetails.password) {
                    toast.warning("All fields are required");
                    return;
                  }
                  const data = await loginUser(userDetails);
                  sessionStorage.setItem("token", data.token);
                  sessionStorage.setItem("user_id", data.user._id);
                  navigate("/jobs/home");
                } catch (error) {
                  toast.error(error.response.data.message);
                }
              }}
            >
              Login
            </Button>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              Don't have an account?
              <Link to="/" style={{ textDecoration: "none" }}>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#1976D2",
                    cursor: "pointer",
                  }}
                >
                  Register
                </p>
              </Link>
            </div>
          </div>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Login;
