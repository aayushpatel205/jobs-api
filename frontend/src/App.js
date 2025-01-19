import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/jobs/home" element={<HomePage/>}/>
      </Routes>
  );
};

export default App;
