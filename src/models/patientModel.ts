import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  age: number;
  
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export const Patient: Model<IPatient> = mongoose.model<IPatient>('Patient', PatientSchema);