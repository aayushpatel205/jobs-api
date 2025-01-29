import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const array = location.pathname.split("/");
  if (array[1] !== "jobs") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
  }
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/jobs/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route />
    </Routes>
  );
};

export default App;
