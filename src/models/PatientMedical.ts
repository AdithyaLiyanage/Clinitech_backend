import mongoose, { Schema, Document } from "mongoose";

export interface IPatientMedicalData extends Document {
  patientID: mongoose.Schema.Types.ObjectId;
  date: Date;
  hbA1c: number;
  fastingGlucose: number;
  totalCholesterol: number;
  hdlC: number;
  ldlC: number;
  triglycerides: number;
  tgLdlRatio: number;
  eGFR: number;
  uAlbCreatinineRatio: number;
}

const PatientMedicalDataSchema: Schema = new Schema(
  {
    patientID: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    date: { type: Date, required: true },
    hbA1c: { type: Number, required: true },
    fastingGlucose: { type: Number, required: true },
    totalCholesterol: { type: Number, required: true },
    hdlC: { type: Number, required: true },
    ldlC: { type: Number, required: true },
    triglycerides: { type: Number, required: true },
    tgLdlRatio: { type: Number, required: true },
    eGFR: { type: Number, required: true },
    uAlbCreatinineRatio: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPatientMedicalData>(
  "PatientMedicalData",
  PatientMedicalDataSchema
);
