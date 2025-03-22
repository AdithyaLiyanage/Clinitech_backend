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
router.post("/patients", authenticate, PatientController.createPatient);
router.get("/patients", authenticate, PatientController.getAllPatients);
router.get("/patients/:id", authenticate, PatientController.findPatientById);
router.put("/patients/:id", authenticate, PatientController.updatePatient);
router.delete("/patients/:id", authenticate, PatientController.deletePatient);

export default router;
