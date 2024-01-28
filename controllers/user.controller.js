import { getUserById, deleteUserById, User } from "../models/user.model.js";
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
  const id = req.query.userId;
  const username = req.query.username;

  try {
    const user = id ? await getUserById(id) : await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.toJSON());
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const followUser = async (req, res) => {
  console.log("Access request");
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      console.log("Access request user", user);

      const currentUser = await User.findById(req.body.userId);
      console.log("Access request currentUser", currentUser);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followering: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

export const unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followering: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);
    const friends = await Promise.all(
      user.followering.map((friendId) => {
        return getUserById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, avatar } = friend;
      friendList.push({ _id, username, avatar });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
};
