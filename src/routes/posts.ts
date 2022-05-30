import express from "express";
import {
  searchPosts,
  getPosts,
  createPosts,
  getPost,
  updatePosts,
  deletePosts,
  likePosts,
  postComments,
} from "../controllers/posts";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/search", auth, searchPosts);
router.get("/", auth, getPosts);
router.get("/:id", auth, getPost);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePosts);
router.delete("/:id", auth, deletePosts);
router.patch("/:id/likePosts", auth, likePosts);
router.post("/:id/postComments", auth, postComments);

export default router;
