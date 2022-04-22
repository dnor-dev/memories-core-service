"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComments = exports.likePosts = exports.deletePosts = exports.updatePosts = exports.createPosts = exports.getPost = exports.searchPosts = exports.getPosts = void 0;
const postMessage_1 = __importDefault(require("../models/postMessage"));
const mongoose_1 = __importDefault(require("mongoose"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = yield postMessage_1.default.countDocuments({});
        const posts = yield postMessage_1.default.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);
        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
            total,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getPosts = getPosts;
const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const post = yield postMessage_1.default.find({
            $or: [{ title }, { tags: { $in: tags.split(",") } }],
        });
        res.status(200).json({ data: post });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.searchPosts = searchPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    try {
        const post = yield postMessage_1.default.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getPost = getPost;
const createPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, userId } = req;
    try {
        const newPost = new postMessage_1.default(Object.assign(Object.assign({}, body), { creator: userId, createdAt: new Date().toISOString() }));
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.createPosts = createPosts;
const updatePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body, } = req;
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: "No post with that id" });
    try {
        const updatedPost = yield postMessage_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updatePosts = updatePosts;
const deletePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, userId, } = req;
    if (!userId)
        return res.json({ message: "Unauthenticated" });
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: "No post with that id" });
    try {
        yield postMessage_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Post Deleted!" });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.deletePosts = deletePosts;
const likePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, userId, } = req;
    if (!userId)
        return res.json({ message: "Unauthenticated" });
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: "No post with that id" });
    try {
        const post = yield postMessage_1.default.findById(id);
        const postId = post.likes.findIndex((id) => id === userId);
        if (post.likes.includes(userId)) {
            post.likes.splice(postId, 1);
        }
        else {
            post.likes.push(userId);
        }
        const updatedPost = yield postMessage_1.default.findByIdAndUpdate(id, post, {
            new: true,
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.likePosts = likePosts;
const postComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body: { comment }, } = req;
    try {
        const post = yield postMessage_1.default.findById(id);
        post.comments.push(comment);
        const updatedPost = yield postMessage_1.default.findByIdAndUpdate(id, post, {
            new: true,
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.postComments = postComments;
//# sourceMappingURL=posts.js.map