import DrugInventory, { IDrugInventory } from "../models/DrugInventory";

export const getAllDrugs = async (): Promise<IDrugInventory[]> => {
  return DrugInventory.find();
};

export const getDrugById = async (id: string): Promise<IDrugInventory | null> => {
  return DrugInventory.findById(id);
};

export const createDrug = async (drugData: Partial<IDrugInventory>): Promise<IDrugInventory> => {
  return DrugInventory.create(drugData);
};

export const updateDrug = async (id: string, drugData: Partial<IDrugInventory>): Promise<IDrugInventory | null> => {
  return DrugInventory.findByIdAndUpdate(id, drugData, { new: true });
};

export const deleteDrug = async (id: string): Promise<IDrugInventory | null> => {
  return DrugInventory.findByIdAndDelete(id);
};
