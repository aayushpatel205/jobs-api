import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  if (!user) return null;
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


const jwtAuthMiddleware = (req, res, next) => {
  if(req.headers.authorization === undefined){
    return res.status(401).send({ message: "Please provide a token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export { jwtAuthMiddleware , generateToken };
