import { Request, Response } from "express";
import * as service from "../services/PatientMedicalService";

export const createPatientMedicalData = async (req: Request, res: Response) => {
  try {
    const medicalData = await service.createPatientMedicalData(req.body);
    res.status(201).json(medicalData);
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};

export const getAllPatientMedicalData = async (_req: Request, res: Response) => {
  try {
    const medicalData = await service.getAllPatientMedicalData();
    res.status(200).json(medicalData);
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};

export const getPatientMedicalDataByPatientID = async (req: Request, res: Response) => {
  try {
    const medicalData = await service.getPatientMedicalDataByPatientID(req.params.patientID);
    res.status(200).json(medicalData);
  }catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};

export const updatePatientMedicalData = async (req: Request, res: Response) => {
  try {
    const updatedData = await service.updatePatientMedicalData(req.params.id, req.body);
    res.status(200).json(updatedData);
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};

export const deletePatientMedicalData = async (req: Request, res: Response) => {
  try {
    await service.deletePatientMedicalData(req.params.id);
    res.status(200).json({ message: "Patient medical data deleted successfully" });
  }catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};
