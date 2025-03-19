import mongoose, { Document, Schema } from "mongoose";

// Define the interface for TypeScript
export interface IPatient extends Document {
  fullName: string;
  NIC: string;
  preferredName: string;
  address: string;
  DOB: Date;
  age: number;
  occupation: string;
  gender: string;
  bloodType: string;
  maritalStatus: string;
  contactNumber: string;
  email: string;
  guardian: {
    fullName: string;
    NIC: string;
    contactNumber: string;
    relation: string;
  };
}

// Define the Mongoose schema
const PatientSchema = new Schema<IPatient>({
  fullName: { type: String, required: true },
  NIC: { type: String, required: true, unique: true },
  preferredName: { type: String, required: true },
  address: { type: String, required: true },
  DOB: { type: Date, required: true },
  age: { type: Number, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, required: true },
  bloodType: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  guardian: {
    fullName: { type: String, required: true },
    NIC: { type: String, required: true },
    contactNumber: { type: String, required: true },
    relation: { type: String, required: true },
  },
});

export default mongoose.model<IPatient>("Patient", PatientSchema);
