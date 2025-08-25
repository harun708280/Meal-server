
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/users/users.js";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
     " MyVeryStrongSecret123!@#",
      { expiresIn: "7d" }
    );

    res.json({  user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password hide
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
