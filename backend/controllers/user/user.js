import User from "../../model/User.js";
import bcrypt from "bcryptjs";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hash, // Consider hashing the password before saving
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully."});
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }
  
      // Check if password is correct
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }
  
      res.status(200).json({ message: "Login successful.", user });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };