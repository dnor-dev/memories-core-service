"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signup = exports.signin = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Users = yield user_1.default.find();
    res.status(200).json(Users);
});
exports.getUsers = getUsers;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User not found!" });
        const isPasswordCorrect = bcrypt_1.default.compareSync(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials." });
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ existingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        const saltRounds = 10;
        const hash = bcrypt_1.default.hashSync(password, saltRounds);
        if (existingUser)
            return res.status(500).json({ message: "User already exists" });
        if (password !== confirmPassword)
            return res.status(500).json({ message: "Passwords do not match" });
        const newUser = yield user_1.default.create({
            email,
            password: hash,
            name: `${firstName} ${lastName}`,
        });
        const token = jsonwebtoken_1.default.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ newUser, token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.signup = signup;
//# sourceMappingURL=user.js.map