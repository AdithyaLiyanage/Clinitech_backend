import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHospitalService extends Document {
  name: string;
  price: number;
}

const HospitalServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { collection: 'HospitalServices' } // force using the existing collection name
);

const HospitalService: Model<IHospitalService> = mongoose.model<IHospitalService>(
  'HospitalService',
  HospitalServiceSchema
);

export default HospitalService;
