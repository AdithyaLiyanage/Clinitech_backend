import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, login, updateUser } from "../controllers/UserController";
import { authenticateJWT } from "../middleware/AuthMiddleware";

const router = express.Router();


// Middleware to check if the user is an Admin
const isAdmin = (req: any, res: express.Response, next: express.NextFunction): void => {
  if (req.user?.role !== "Admin") {
    res.status(403).json({ message: "Forbidden: Admin access required" });
  } else {
    next();
  }
};

// Create User
router.post("/create",createUser);

// login User
router.post("/login", login);

// Get All Users
router.get("/", authenticateJWT, isAdmin, getAllUsers);

// Get User by ID
router.get("/:userId", authenticateJWT, getUserById);

// Update User
router.put("/:userId", authenticateJWT, isAdmin, updateUser);

// Delete User
router.delete("/:userId", authenticateJWT, isAdmin, deleteUser);

// Protected Route Example
router.get("/profile", authenticateJWT, (req: express.Request, res: express.Response) => {
    const authReq = req as any; // Temporary fix
    res.json({ message: "User Profile", user: authReq.user });
  });
export default router;
