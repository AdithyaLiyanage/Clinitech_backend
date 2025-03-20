import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBill extends Document {
  patientId: mongoose.Types.ObjectId;
  dailyAmount: number;
  createdAt: Date;
}

const BillSchema = new Schema<IBill>({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  dailyAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Bill: Model<IBill> = mongoose.model<IBill>("Bill", BillSchema);