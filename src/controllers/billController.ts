// src/controllers/test.ts
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/billService';

export const searchPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const patient = await service.getPatientDetails(id);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

export const addBillController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientId, dailyAmount } = req.body;
    const bill = await service.addBill(patientId, dailyAmount);
    res.status(201).json({ success: true, data: bill });
  } catch (error) {
    next(error);
  }
};
