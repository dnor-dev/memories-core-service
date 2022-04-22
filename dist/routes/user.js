"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get("/", user_1.getUsers);
router.post("/signin", user_1.signin);
router.post("/signup", user_1.signup);
exports.default = router;
//# sourceMappingURL=user.js.map