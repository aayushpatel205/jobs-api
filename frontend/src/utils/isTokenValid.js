import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return Date.now() < decodedToken.exp * 1000; // Check if token is still valid
  } catch (error) {
    return false;
  }
};
