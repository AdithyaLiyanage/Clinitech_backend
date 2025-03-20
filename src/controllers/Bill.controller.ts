import { Request, Response, NextFunction } from "express";
import * as billService from "../services/Bill.service";
import { MainBill } from "../models/Bill.model";
import HospitalService from "../models/HospitalService.model";
import Treatment from "../models/Treatment.model";

export const searchPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await billService.getPatientDetails(id);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

export const addBillController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { patientId, dailyAmount, hospitalServices, treatments } = req.body;
    // Pass the new fields to the service
    const mainBill = await billService.addSubBill(
      patientId,
      dailyAmount,
      hospitalServices,
      treatments
    );
    res.status(201).json({ success: true, data: mainBill });
  } catch (error) {
    next(error);
  }
};

export const checkoutPatientController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params; // Patient ID
    const { insuranceCoverage } = req.body;

    // Find the patient's main bill
    const mainBill = await MainBill.findOne({ patientId: id });

    if (!mainBill) {
      res
        .status(404)
        .json({ success: false, message: "Main bill for patient not found" });
      return;
    }

    // If insurance coverage is provided, calculate the new final amount
    if (insuranceCoverage) {
      mainBill.insuranceCoverage = insuranceCoverage;
      mainBill.finalAmount = Math.max(
        mainBill.finalAmount - insuranceCoverage,
        0
      ); // Ensure it doesn't go negative
    }

    mainBill.isCheckedOut = true;

    // Save the updated bill
    await mainBill.save();

    res.json({ success: true, data: mainBill });
  } catch (error) {
    next(error);
  }
};

export const getPatientBill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params; // patient mongo id
    const bill = await MainBill.findOne({ patientId: id });
    if (!bill) {
      res.status(404).json({ success: false, message: "Bill not found" });
      return;
    }
    res.json({ success: true, data: bill });
  } catch (error) {
    next(error);
  }
};

export const getHospitalServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await HospitalService.find({});
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const getTreatments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const treatments = await Treatment.find({});
    res.json({ success: true, data: treatments });
  } catch (error) {
    next(error);
  }
};

export const createSMSController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { patientId, billId, message } = req.body;
    const sms = await billService.createSMSRecord(patientId, billId, message);
    res.status(201).json({ success: true, data: sms });
  } catch (error) {
    next(error);
  }
};

export const getSMSMessagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { patientId } = req.params;
    const smsMessages = await billService.getSMSMessages(patientId);
    res.json({ success: true, data: smsMessages });
  } catch (error) {
    next(error);
  }
};