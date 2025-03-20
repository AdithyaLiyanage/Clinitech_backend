import { IBill, Bill } from '../models/billModel';
import Patient from '../models/Patient';
import mongoose from 'mongoose';

export const findPatientById = async (id: string) => {
  return Patient.findById(id);
};

export const createBill = async (patientId: string, dailyAmount: number) => {
  const billData: Partial<IBill> = {
    patientId: new mongoose.Types.ObjectId(patientId),
    dailyAmount,
  };
  const bill = new Bill(billData);
  return bill.save();
};
