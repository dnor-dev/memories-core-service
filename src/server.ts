import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnect from "./utils/dbConnect";
import postRoutes from "./routes/posts";
import userRoutes from "./routes/user";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.status(200).json("Go to the posts route oga!");
});

// Routes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const callback = () => {
  app.listen(port, () => console.log(`App is running on port ${port}`));
};

// Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  }),
);
app.use(cors);

// DB connection
dbConnect(callback);
