import express from "express";
import connectDatabase from "./database/connect.js";
import AuthRoutes from "./routes/auth/authRoute.js";
import JobRoutes from "./routes/jobs/jobsRoute.js";
import User from "./model/User.js";
import bcrypt from "bcryptjs";
import cors from "cors";
import { jwtAuthMiddleware } from "./jwt.js";

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());


// passport.use(new LocalStrategy(async (username, password, done) => {}));

const authFunction = async (req, res, next) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    res.status(200).send({ message: "Login successful.", user });
    // next();
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};



// passport.serializeUser((userObj, done) => {
//   done(null, userObj);
// });
app.use("/auth", AuthRoutes);
app.use("/jobs", jwtAuthMiddleware , JobRoutes);
// passport.deserializeUser((userObj, done) => {
//   done(null, userObj);
// });

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
