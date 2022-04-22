"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get("/search", posts_1.searchPosts);
router.get("/", posts_1.getPosts);
router.get("/:id", posts_1.getPost);
router.post("/", auth_1.default, posts_1.createPosts);
router.patch("/:id", auth_1.default, posts_1.updatePosts);
router.delete("/:id", auth_1.default, posts_1.deletePosts);
router.patch("/:id/likePosts", auth_1.default, posts_1.likePosts);
router.post("/:id/postComments", auth_1.default, posts_1.postComments);
exports.default = router;
//# sourceMappingURL=posts.js.map