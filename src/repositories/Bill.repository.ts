import { IMainBill, MainBill } from "../models/Bill.model";
import HospitalService from "../models/HospitalService.model";
import Treatment from "../models/Treatment.model";
import Patient from "../models/Patient";
import mongoose from "mongoose";
import SMS, { ISMS } from "../models/SMS.model";
import { ObjectId } from "mongodb";

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

  // find or bootstrap the main bill (no services/treatments on it anymore)
  let mainBill = await MainBill.findOne({ patientId });
  if (!mainBill) {
    mainBill = new MainBill({
      patientId,
      subBills: [],
      finalAmount: 0,
      insuranceCoverage: 0,
      isCheckedOut: false,
    });
  }

  // push the FIRST subBill and embed services/treatments there
  mainBill.subBills.push({
    _id: new mongoose.Types.ObjectId(),
    dailyAmount,
    hospitalServices,
    treatments,
  });

  // recompute total
  mainBill.finalAmount = mainBill.subBills.reduce(
    (sum, sb) => sum + sb.dailyAmount,
    0
  );

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

export const getSMSMessages = async (patientId: string): Promise<ISMS[]> => {
  return SMS.find({ patientId });
};

export const updateBill = async (
  billId: string,
  updateData: Partial<{
    hospitalServices: string[];
    treatments: string[];
    insuranceCoverage: number;
    isCheckedOut: boolean;
  }>
) => {
  if (!mongoose.Types.ObjectId.isValid(billId)) {
    throw new Error("Invalid billId");
  }
  return MainBill.findByIdAndUpdate(billId, updateData, { new: true });
};

/**
 * Delete a main bill by its ID
 */
export const deleteBill = async (billId: string) => {
  if (!mongoose.Types.ObjectId.isValid(billId)) {
    throw new Error("Invalid billId");
  }
  return MainBill.findByIdAndDelete(billId);
};

/**
 * Update a sub-bill's dailyAmount
 */
export const updateSubBill = async (
  billId: string,
  subBillId: string,
  data: {
    dailyAmount?: number;
    hospitalServices?: string[];
    treatments?: string[];
  }
) => {
  const mainBill = await MainBill.findById(billId);
  if (!mainBill) throw new Error("Main bill not found");

  // find the index of the sub-bill
  const idx = mainBill.subBills.findIndex(
    (sb) => sb._id.toString() === subBillId
  );
  if (idx === -1) throw new Error("Sub-bill not found");

  if (data.dailyAmount !== undefined) {
    mainBill.subBills[idx].dailyAmount = data.dailyAmount;
  }
  if (data.hospitalServices !== undefined) {
    mainBill.subBills[idx].hospitalServices = data.hospitalServices;
  }
  if (data.treatments !== undefined) {
    mainBill.subBills[idx].treatments = data.treatments;
  }

  // recalc finalAmount
  mainBill.finalAmount = mainBill.subBills.reduce(
    (sum, sb) => sum + sb.dailyAmount,
    0
  );

  await mainBill.save();
  return mainBill;
};

export const deleteSubBill = async (billId: string, subBillId: string) => {
  const mainBill = await MainBill.findById(billId);
  if (!mainBill) throw new Error("Main bill not found");

  // filter out the sub-bill
  mainBill.subBills = mainBill.subBills.filter(
    (sb) => sb._id.toString() !== subBillId
  );

  // recalc finalAmount
  mainBill.finalAmount = mainBill.subBills.reduce(
    (sum, sb) => sum + sb.dailyAmount,
    0
  );

  await mainBill.save();
  return mainBill;
};
