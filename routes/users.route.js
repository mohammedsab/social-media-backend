import {
  deleteUser,
  getUserData,
  updateUserData,
  followUser,
  unfollowUser,
} from "../controllers/user.controller.js";

export default (router) => {
  router.put("/user/:id", updateUserData);
  router.delete("/user/:id", deleteUser);
  router.get("/user/:id", getUserData);
  router.post("/user/:id/follow", followUser);
  router.post("/user/:id/unfollow", unfollowUser);
};
