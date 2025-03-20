import express from "express";
import * as PatientController from "../controllers/PatientController";
import { authenticateJWT as authenticate } from "../middleware/AuthMiddleware";

const router = express.Router();

// Middleware to check if the user is an Admin
const isAdmin = (req: any, res: express.Response, next: express.NextFunction): void => {
  if (req.user?.role !== "Admin") {
    res.status(403).json({ message: "Forbidden: Admin access required" });
  } else {
    next();
  }
};

// Admin-Only Routes for Managing Patients
router.post("/patients", authenticate, isAdmin, PatientController.createPatient);
router.get("/patients", authenticate, isAdmin, PatientController.getAllPatients);
router.get("/patients/:id", authenticate, isAdmin, PatientController.findPatientById);
router.put("/patients/:id", authenticate, isAdmin, PatientController.updatePatient);
router.delete("/patients/:id", authenticate, isAdmin, PatientController.deletePatient);

export default router;
