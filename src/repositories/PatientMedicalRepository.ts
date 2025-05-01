import PatientMedicalData, { IPatientMedicalData } from "../models/PatientMedical";

export const createPatientMedicalData = async (data: IPatientMedicalData) => {
  return await PatientMedicalData.create(data);
};

export const getAllPatientMedicalData = async () => {
  return await PatientMedicalData.find().populate("patientID");
};

export const getPatientMedicalDataByPatientID = async (patientID: string) => {
  return await PatientMedicalData.find({ patientID }).populate("patientID");
};

export const updatePatientMedicalData = async (id: string, data: Partial<IPatientMedicalData>) => {
  return await PatientMedicalData.findByIdAndUpdate(id, data, { new: true });
};

export const deletePatientMedicalData = async (id: string) => {
  return await PatientMedicalData.findByIdAndDelete(id);
};
