import React from "react";
import { TextField, Button, Card } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      style={{
        marginTop: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" style={{ width: "27%", borderRadius: 15}}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 35, fontWeight: 600 }}>Login User.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <TextField
              label="Email"
              variant="outlined"
              style={{ width: 280 }}
              size="small"
            />
            <TextField
              label="Password"
              variant="outlined"
              style={{ width: 280 }}
              size="small"
            />

            <Button variant="contained">Login</Button>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
    </div>
  );
};

export default Login;
