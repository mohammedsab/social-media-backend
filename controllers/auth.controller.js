import { createUser, getUserByEmail } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Complete user data" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    console.log(user);
    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
