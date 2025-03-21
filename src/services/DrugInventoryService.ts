import { IDrugInventory } from "../models/DrugInventory";
import * as DrugInventoryRepository from "../repositories/DrugInventoryRepository";

export const getAllDrugs = async (): Promise<IDrugInventory[]> => {
  return DrugInventoryRepository.getAllDrugs();
};

export const getDrugById = async (id: string): Promise<IDrugInventory | null> => {
  return DrugInventoryRepository.getDrugById(id);
};

export const createDrug = async (drugData: Partial<IDrugInventory>): Promise<IDrugInventory> => {
  return DrugInventoryRepository.createDrug(drugData);
};

export const updateDrug = async (id: string, drugData: Partial<IDrugInventory>): Promise<IDrugInventory | null> => {
  return DrugInventoryRepository.updateDrug(id, drugData);
};

export const deleteDrug = async (id: string): Promise<IDrugInventory | null> => {
  return DrugInventoryRepository.deleteDrug(id);
};
