import {
  createPost,
  deletePost,
  getPost,
  likePost,
  timelinePost,
  updatePost,
} from "../controllers/post.contrpller.js";

export default (router) => {
  router.post("/post", createPost);
  router.put("/post/:id", updatePost);
  router.delete("/post/:id", deletePost);
  router.put("/post/:id/like", likePost);
  router.get("/post/:id", getPost);
  router.get("/post/timeline/all", timelinePost);
};
