import * as PatientRepository from "../repositories/PatientRepository";
import { IPatient } from "../models/Patient";

export const createPatientService = async (patientData: Partial<IPatient>) => {
  return await PatientRepository.createPatient(patientData);
};

export const getAllPatientsService = async () => {
  return await PatientRepository.getAllPatients();
};

export const findPatientByIdService = async (id: string) => {
  return await PatientRepository.findPatientById(id);
};

export const updatePatientService = async (id: string, data: Partial<IPatient>) => {
  return await PatientRepository.updatePatient(id, data);
};

export const deletePatientService = async (id: string) => {
  return await PatientRepository.deletePatient(id);
};
