import React, { useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link , useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApis";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
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
      <Card variant="outlined" style={{width: "27%",borderRadius: 15}}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 35, fontWeight: 600 }}>Register User.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <TextField
              label="Username"
              variant="outlined"
              style={{ width: 280 }}
              size="small"
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              value={userDetails.username}
            />
            <TextField
              label="Email"
              variant="outlined"
              style={{ width: 280 }}
              size="small"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              value={userDetails.email}
            />

            <TextField
              label="Password"
              variant="outlined"
              style={{ width: 280 }}
              size="small"
              type="password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              value={userDetails.password}
            />
            <Link
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                onClick={async () => {
                  try{
                    if (
                      !userDetails.password ||
                      !userDetails.email ||
                      !userDetails.username
                    ) {
                      toast.warning("All fields are required");
                      return;
                    }
                    const response = await registerUser(userDetails);
                    setUserDetails({
                      username: "",
                      email: "",
                      password: "",
                    });

                    if(response.message === "User registered successfully."){
                      navigate("/login");
                    }
                  }catch(error){
                    toast.warning(error.response.data.message);
                  }
                }}
              >
                Register
              </Button>
            </Link>

            <div style={{ display: "flex", gap: 10, alignItems: "center" , marginBottom: 10}}>
              Already have an account?
              <Link to="/login" style={{ textDecoration: "none" }}>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#1976D2",
                    cursor: "pointer",
                  }}
                >
                  Login
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

export default Register;
