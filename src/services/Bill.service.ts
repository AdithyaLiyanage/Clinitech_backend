import { MainBill, IMainBill } from "../models/Bill.model";
import mongoose from "mongoose";
import * as repository from "../repositories/Bill.repository";
import { ISMS } from "../models/SMS.model";
import { ObjectId } from "mongodb";
import { createBill } from "../repositories/Bill.repository";

export const addSubBill = async (
  patientId: string,
  dailyAmount: number,
  hospitalServices: string[] = [],
  treatments: string[] = []
) => {
  let mainBill = await MainBill.findOne({ patientId });

  if (!mainBill) {
    return createBill(patientId, dailyAmount, hospitalServices, treatments);
  }

  mainBill.subBills.push({
    _id: new mongoose.Types.ObjectId(),
    dailyAmount,
    hospitalServices,
    treatments,
  });

  mainBill.finalAmount += dailyAmount;

  await mainBill.save();
  return mainBill;
};

export const getPatientDetails = async (id: string) => {
  const patient = await repository.findPatientById(id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};

export const getPatientBill = async (patientId: string) => {
  const bill = await repository.findBillByPatientId(patientId);
  if (!bill) {
    throw new Error("Bill not found");
  }
  return bill;
};

export const getHospitalServices = async () => {
  const services = await repository.findAllHospitalServices();
  return services;
};

export const getTreatments = async () => {
  const treatments = await repository.findAllTreatments();
  return treatments;
};

export const createSMSRecord = async (
  patientId: string,
  billId: string,
  message: string
): Promise<ISMS> => {
  return repository.createSMSRecord(patientId, billId, message);
};

export const getSMSMessages = async (patientId: string): Promise<ISMS[]> => {
  return repository.getSMSMessages(patientId);
};

export const editBill = async (
  billId: string,
  data: {
    hospitalServices?: string[];
    treatments?: string[];
    insuranceCoverage?: number;
    isCheckedOut?: boolean;
  }
) => {
  const updated = await repository.updateBill(billId, data);
  if (!updated) throw new Error("Bill not found");
  return updated;
};

export const removeBill = async (billId: string) => {
  const deleted = await repository.deleteBill(billId);
  if (!deleted) throw new Error("Bill not found");
  return deleted;
};

export const editSubBill = async (
  billId: string,
  subBillId: string,
  data: {
    dailyAmount?: number;
    hospitalServices?: string[];
    treatments?: string[];
  }
) => {
  return repository.updateSubBill(billId, subBillId, data);
};

export const removeSubBill = async (billId: string, subBillId: string) => {
  return repository.deleteSubBill(billId, subBillId);
};
