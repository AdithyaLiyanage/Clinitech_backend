// models/billModel.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubBill {
  dailyAmount: number;
  createdAt?: Date;
}

export interface IMainBill extends Document {
  patientId: mongoose.Types.ObjectId;
  subBills: ISubBill[];
  finalAmount: number;
  insuranceCoverage: number;
  hospitalServices: string[];
  treatments: string[];
  isCheckedOut: boolean;
  createdAt: Date;
}

const SubBillSchema = new Schema<ISubBill>({
  dailyAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MainBillSchema = new Schema<IMainBill>({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  subBills: { type: [SubBillSchema], default: [] },
  finalAmount: { type: Number, default: 0 },
  insuranceCoverage: { type: Number, default: 0 },
  hospitalServices: { type: [String], default: [] },
  treatments: { type: [String], default: [] },
  isCheckedOut: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const MainBill: Model<IMainBill> = mongoose.model<IMainBill>("MainBill", MainBillSchema);
