import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// BEFORE
export interface ISubBill {
  _id: Types.ObjectId;
  dailyAmount: number;
  createdAt?: Date;
}

// AFTER
export interface ISubBill {
  _id: Types.ObjectId;
  dailyAmount: number;
  hospitalServices: string[];   // ← new
  treatments: string[];         // ← new
  createdAt?: Date;
}

export interface IMainBill extends Document {
  patientId: mongoose.Types.ObjectId;
  subBills: ISubBill[];
  finalAmount: number;
  insuranceCoverage: number;
  isCheckedOut: boolean;
  createdAt: Date;
}


// Sub-bill now holds its own services & treatments
const SubBillSchema = new Schema<ISubBill>({
  dailyAmount:   { type: Number, required: true },
  hospitalServices: { type: [String], default: [] },
  treatments:       { type: [String], default: [] },
  createdAt:     { type: Date,   default: Date.now },
});

const MainBillSchema = new Schema<IMainBill>({
  patientId:        { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  subBills:         { type: [SubBillSchema], default: [] },
  finalAmount:      { type: Number, default: 0 },
  insuranceCoverage:{ type: Number, default: 0 },
  isCheckedOut:     { type: Boolean, default: false },
  createdAt:        { type: Date, default: Date.now },
});


export const MainBill: Model<IMainBill> = mongoose.model<IMainBill>("MainBill", MainBillSchema);
