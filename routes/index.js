import express from "express";
import usersRoute from "./users.route.js";
import authRoute from "./auth.route.js";
const router = express.Router();

export default () => {
  usersRoute(router);
  authRoute(router);
  return router;
};
