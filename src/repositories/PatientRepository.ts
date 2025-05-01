import Patient, { IPatient } from "../models/Patient";

export const createPatient = async (patientData: Partial<IPatient>): Promise<IPatient> => {
  return await Patient.create(patientData);
};

export const getAllPatients = async (): Promise<IPatient[]> => {
  return await Patient.find();
};

export const findPatientById = async (id: string): Promise<IPatient | null> => {
  return await Patient.findById(id);
};

export const updatePatient = async (id: string, patientData: Partial<IPatient>): Promise<IPatient | null> => {
  return await Patient.findByIdAndUpdate(id, patientData, { new: true });
};

export const deletePatient = async (id: string): Promise<IPatient | null> => {
  return await Patient.findByIdAndDelete(id);
};
