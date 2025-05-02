import express from "express";
import * as controller from "../controllers/PatientMedicalController";
import { authenticateJWT } from "../middleware/AuthMiddleware";

const router = express.Router();

// Middleware to check if the user is an Admin
const isDoctor = (req: any, res: express.Response, next: express.NextFunction): void => {
  if (req.user?.role !== "Doctor") {
    res.status(403).json({ message: "Forbidden: Admin access required" });
  } else {
    next();
  }
};

router.post("/", authenticateJWT,isDoctor, controller.createPatientMedicalData);
router.get("/", authenticateJWT,isDoctor, controller.getAllPatientMedicalData);
router.get("/:patientID", authenticateJWT,isDoctor, controller.getPatientMedicalDataByPatientID);
router.put("/:id",authenticateJWT, isDoctor, controller.updatePatientMedicalData);
router.delete("/:id",authenticateJWT, isDoctor,controller.deletePatientMedicalData);

export default router;
