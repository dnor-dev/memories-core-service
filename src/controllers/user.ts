import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import * as dotenv from "dotenv";

dotenv.config();

export const getUser = async (req: any, res: any) => {
  const { userId } = req;
  const user = await User.findById(userId);
  res.status(200).json(user);
};

export const signin = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User not found!" });

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req: any, res: any) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    if (existingUser)
      return res.status(500).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(500).json({ message: "Passwords do not match" });

    const newUser = await User.create({
      email,
      password: hash,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
