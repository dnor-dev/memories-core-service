"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const callback = () => {
    app.listen(5000, () => console.log(`App is running on port ${port}`));
};
(0, dbConnect_1.default)(callback);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    limit: "30mb",
    extended: true,
}));
app.use(cors_1.default);
//# sourceMappingURL=server.js.map