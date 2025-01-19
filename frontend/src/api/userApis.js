import axios from "axios";

export const registerUser = async (user) => {
  const newUser = {
    name: user.username,
    email: user.email,
    password: user.password,
  };
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/register",
      newUser
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.get("http://localhost:8000/auth/login", {
      params: user,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
