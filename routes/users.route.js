import {
  deleteUser,
  getUserData,
  updateUserData,
  followUser,
  unfollowUser,
  getUserFriends,
} from "../controllers/user.controller.js";

export default (router) => {
  router.put("/user/:id", updateUserData);
  router.delete("/user/:id", deleteUser);
  router.get("/user/", getUserData);
  router.put("/user/:id/follow", followUser);
  router.put("/user/:id/unfollow", unfollowUser);
  router.get("/user/friends/:userId", getUserFriends);
};
