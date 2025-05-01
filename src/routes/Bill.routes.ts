import { Router } from "express";
import {
  searchPatient,
  addBillController,
  checkoutPatientController,
  getPatientBill,
  getHospitalServices,
  getTreatments,
  createSMSController,
  getSMSMessagesController,
  deleteBillController,
  deleteSubBillController,
  editBillController,
  editSubBillController,
  sendReportByEmailController,
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

// Main bill
router.put("/bill/:billId", editBillController);
router.delete("/bill/:billId", deleteBillController);

// Sub-bill
router.put("/bill/:billId/subbill/:subBillId", editSubBillController);
router.delete("/bill/:billId/subbill/:subBillId", deleteSubBillController);

router.post("/bill/:patientId/email-report", sendReportByEmailController);

export default router;
