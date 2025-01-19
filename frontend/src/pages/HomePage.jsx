import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  useEffect(() => {
    toast.success("Login successful!!");
  }, []);
  return (
    <>
      <div>HomePage</div>
      <ToastContainer/>
    </>
  );
};

export default HomePage;
