import { Request, Response } from "express";
import * as PatientService from "../services/PatientService";
import Patient from "../models/Patient";

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await PatientService.createPatientService(req.body);
    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    res.status(400).json({ message: "Error creating patient", error: (error as Error).message });
  }
};

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await PatientService.getAllPatientsService();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error: (error as Error).message });
  }
};

export const findPatientById = async (req: Request, res: Response): Promise<void> => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            res.status(404).json({ message: "Patient not found" });
            return;
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updatePatient = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedPatient = await PatientService.updatePatientService(req.params.id, req.body);
      if (!updatedPatient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }
      res.status(200).json({ message: "Patient updated successfully", updatedPatient });
    } catch (error) {
      res.status(500).json({ message: "Error updating patient", error: (error as Error).message });
    }
  };

  export const deletePatient = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedPatient = await PatientService.deletePatientService(req.params.id);
      if (!deletedPatient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting patient", error: (error as Error).message });
    }
  };