import { Router } from "express";
import {
  searchPatient,
  addBillController,
  checkoutPatientController,
  getPatientBill,
  getHospitalServices,
  getTreatments,
  createSMSController,
  getSMSMessagesController
} from "../controllers/Bill.controller";

const router = Router();

router.get("/bill/patient/:id", getPatientBill);
router.get("/patient/:id", searchPatient);
router.post("/bill", addBillController);
router.put("/checkout/:id", checkoutPatientController);

router.get("/hospitalservices", getHospitalServices);
router.get("/treatments", getTreatments);

router.post("/sms", createSMSController);
router.get("/sms/:patientId", getSMSMessagesController);

export default router;
