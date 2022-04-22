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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const posts_1 = __importDefault(require("./routes/posts"));
const user_1 = __importDefault(require("./routes/user"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
// Routes
app.use("/posts", posts_1.default);
app.use("/user", user_1.default);
const callback = () => {
    app.listen(port, () => console.log(`App is running on port ${port}`));
};
// Middlewares
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    limit: "30mb",
    extended: true,
}));
app.use(cors_1.default);
// DB connection
(0, dbConnect_1.default)(callback);
//# sourceMappingURL=server.js.map