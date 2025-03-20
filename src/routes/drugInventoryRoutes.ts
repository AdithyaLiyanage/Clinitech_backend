import express from "express";
import * as DrugInventoryController from "../controllers/DrugInventoryController";
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


router.get("/", authenticateJWT, isAdmin, DrugInventoryController.getAllDrugs);
router.get("/:id", authenticateJWT, isAdmin, DrugInventoryController.getDrugById);
router.post("/", authenticateJWT, isAdmin, DrugInventoryController.createDrug);
router.put("/:id", authenticateJWT, isAdmin, DrugInventoryController.updateDrug);
router.delete("/:id", authenticateJWT, isAdmin, DrugInventoryController.deleteDrug);

export default router;
