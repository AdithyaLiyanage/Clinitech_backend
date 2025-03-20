// models/SMS.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISMS extends Document {
  patientId: mongoose.Types.ObjectId;
  billId: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
}

const SMSSchema: Schema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    billId: { type: Schema.Types.ObjectId, ref: 'MainBill', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }
);

export const SMS: Model<ISMS> = mongoose.model<ISMS>('SMS', SMSSchema);

export default SMS;
