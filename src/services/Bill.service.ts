import { MainBill, IMainBill } from "../models/Bill.model";
import mongoose from "mongoose";
import * as repository from "../repositories/Bill.repository";
import { ISMS } from "../models/SMS.model";

export const addSubBill = async (
  patientId: string,
  dailyAmount: number,
  hospitalServices: string[] = [],
  treatments: string[] = []
) => {
  // Find an existing bill for the patient
  let mainBill = await MainBill.findOne({ patientId });
  if (!mainBill) {
    // Create a new bill if none exists
    mainBill = new MainBill({
      patientId,
      subBills: [],
      finalAmount: 0,
      hospitalServices,
      treatments,
    });
  }
  // Add a new sub-bill and update the final amount
  mainBill.subBills.push({ dailyAmount });
  mainBill.finalAmount += dailyAmount;
  if (hospitalServices.length > 0) {
    mainBill.hospitalServices = hospitalServices;
  }
  if (treatments.length > 0) {
    mainBill.treatments = treatments;
  }
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