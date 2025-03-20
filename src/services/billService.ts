import * as repository from '../repositories/billRepository';

export const getPatientDetails = async (id: string) => {
  const patient = await repository.findPatientById(id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

export const addBill = async (patientId: string, dailyAmount: number) => {
  return repository.createBill(patientId, dailyAmount);
};
