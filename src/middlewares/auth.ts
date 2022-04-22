import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const auth = async (req: any, res: any, next: () => void) => {
  try {
    let decodedData;
    const token = req.headers.authorization.split(" ")[1];

    if (token && token.length < 500) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.verify(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Unauthenticated!" });
  }
};

export default auth;
