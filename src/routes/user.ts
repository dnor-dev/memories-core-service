import express from "express";
import { signin, signup, getUser } from "../controllers/user";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, getUser);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
