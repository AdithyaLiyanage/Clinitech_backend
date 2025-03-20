import * as repository from "../repositories/patientMedicalRepository";
import { IPatientMedicalData } from "../models/PatientMedical";

export const createPatientMedicalData = async (data: IPatientMedicalData) => {
  return await repository.createPatientMedicalData(data);
};

export const getAllPatientMedicalData = async () => {
  return await repository.getAllPatientMedicalData();
};

export const getPatientMedicalDataByPatientID = async (patientID: string) => {
  return await repository.getPatientMedicalDataByPatientID(patientID);
};

export const updatePatientMedicalData = async (id: string, data: Partial<IPatientMedicalData>) => {
  return await repository.updatePatientMedicalData(id, data);
};

export const deletePatientMedicalData = async (id: string) => {
  return await repository.deletePatientMedicalData(id);
};
