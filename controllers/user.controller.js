import { getUserById, deleteUserById } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const updateUserData = async (req, res) => {
  const { id } = req.params;
  const { username, email, desc, city, from, relationship } = req.body;

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    // Update user data
    user.username = username || user.username;
    user.email = email || user.email;
    user.desc = desc || user.desc;
    user.city = city || user.city;
    user.from = from || user.from;
    user.relationship = relationship || user.relationship;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser.toJSON());
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserData = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.toJSON());
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const followUser = async (req, res) => {
  const { id } = req.params;
  const { userIdToFollow } = req.body;

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.followers.includes(userIdToFollow)) {
      user.followers.push(userIdToFollow);
      await user.save();
    }

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const unfollowUser = async (req, res) => {
  const { id } = req.params;
  const { userIdToUnfollow } = req.body;

  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.followers = user.followers.filter(
      (followerId) => followerId !== userIdToUnfollow
    );
    await user.save();

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
