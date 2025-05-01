import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITreatment extends Document {
  name: string;
  price: number;
}

const TreatmentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { collection: 'Treatments' } // force using the existing collection name
);

const Treatment: Model<ITreatment> = mongoose.model<ITreatment>(
  'Treatment',
  TreatmentSchema
);

export default Treatment;
