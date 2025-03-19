import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";


const SECRET_KEY = env.SECRET_KEY || "default_secret_key";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
    return;
  }
};


