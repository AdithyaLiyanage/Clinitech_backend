import { Request, Response } from "express";
import * as DrugInventoryService from "../services/DrugInventoryService";

export const getAllDrugs = async (req: Request, res: Response) => {
  const drugs = await DrugInventoryService.getAllDrugs();
  res.json(drugs);
};

export const getDrugById = async (req: Request, res: Response) => {
  const drug = await DrugInventoryService.getDrugById(req.params.id);
  drug ? res.json(drug) : res.status(404).json({ message: "Drug not found" });
};

export const createDrug = async (req: Request, res: Response) => {
  const drug = await DrugInventoryService.createDrug(req.body);
  res.status(201).json(drug);
};

export const updateDrug = async (req: Request, res: Response) => {
  const drug = await DrugInventoryService.updateDrug(req.params.id, req.body);
  drug ? res.json(drug) : res.status(404).json({ message: "Drug not found" });
};

export const deleteDrug = async (req: Request, res: Response) => {
  const drug = await DrugInventoryService.deleteDrug(req.params.id);
  drug ? res.json({ message: "Drug deleted successfully" }) : res.status(404).json({ message: "Drug not found" });
};
