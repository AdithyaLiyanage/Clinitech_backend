import { IMainBill, MainBill } from "../models/Bill.model";
import HospitalService from "../models/HospitalService.model";
import Treatment from "../models/Treatment.model";
import Patient from "../models/Patient";
import mongoose from "mongoose";
import SMS, { ISMS } from "../models/SMS.model";

export const findPatientById = async (id: string) => {
  return Patient.findById(id);
};

export const createBill = async (
  patientId: string,
  dailyAmount: number,
  hospitalServices: string[] = [],
  treatments: string[] = []
) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("Invalid patientId");
  }

  // Find the existing main bill for the patient
  let mainBill = await MainBill.findOne({ patientId });

  // If no main bill exists, create a new one with the provided services and treatments
  if (!mainBill) {
    mainBill = new MainBill({
      patientId: new mongoose.Types.ObjectId(patientId),
      subBills: [],
      finalAmount: 0,
      insuranceCoverage: 0,
      hospitalServices,
      treatments,
      isCheckedOut: false,
    });
  } else {
    // If a bill already exists, update the hospitalServices and treatments if provided
    if (hospitalServices.length > 0) {
      mainBill.hospitalServices = hospitalServices;
    }
    if (treatments.length > 0) {
      mainBill.treatments = treatments;
    }
  }

  // Add a new sub-bill for the daily amount
  mainBill.subBills.push({ dailyAmount });

  // Recalculate the final bill amount by summing all subBills' dailyAmount values
  mainBill.finalAmount = mainBill.subBills.reduce(
    (sum, subBill) => sum + subBill.dailyAmount,
    0
  );

  // Save and return the updated main bill
  return mainBill.save();
};

export const checkoutPatient = async (
  patientId: string,
  insuranceCoverage: number
) => {
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new Error("Invalid patientId");
  }

  return MainBill.findOneAndUpdate(
    { patientId },
    { isCheckedOut: true, insuranceCoverage },
    { new: true }
  );
};

export const findBillByPatientId = async (patientId: string) => {
  return MainBill.findOne({ patientId });
};

export const findAllTreatments = async () => {
  return Treatment.find({});
};

export const findAllHospitalServices = async () => {
  return HospitalService.find({});
};

export const createSMSRecord = async (
  patientId: string,
  billId: string,
  message: string
): Promise<ISMS> => {
  return SMS.create({ patientId, billId, message });
};