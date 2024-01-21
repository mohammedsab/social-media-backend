import { register, login } from "../controllers/auth.controller.js";

export default (router) => {
  router.post("/register", register);
  router.post("/login", login);
};
