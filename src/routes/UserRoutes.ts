import express from "express";
import UserController from "../controllers/UserController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();


// Middleware to check if the user is an Admin
const isAdmin = (req: any, res: express.Response, next: express.NextFunction): void => {
  if (req.user?.role !== "Admin") {
    res.status(403).json({ message: "Forbidden: Admin access required" });
  } else {
    next();
  }
};

router.post("/register", UserController.register);
router.post("/login", UserController.login);
// Get All Users
router.get("/", authenticateJWT, isAdmin, UserController.getAllUsers);

// Protected Route Example
router.get("/profile", authenticateJWT, (req: express.Request, res: express.Response) => {
    const authReq = req as any; // Temporary fix
    res.json({ message: "User Profile", user: authReq.user });
  });
export default router;
