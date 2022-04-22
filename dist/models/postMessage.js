"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    name: String,
    creator: String,
    tags: [String],
    selectedFile: {
        type: String,
        required: true,
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const PostMessage = mongoose_1.default.models.PostMessage || mongoose_1.default.model("PostMessage", postSchema);
exports.default = PostMessage;
//# sourceMappingURL=postMessage.js.map