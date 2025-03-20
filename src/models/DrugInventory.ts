import mongoose, { Schema, Document } from "mongoose";

export interface IDrugInventory extends Document {
  name: string;
  generic_name: string;
  category: string;
  description: string;
  manufacturer: string;
  batch_number: string;
  expiry_date: Date;
  quantity_in_stock: number;
  reorder_level: number;
  unit_price: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

const DrugInventorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    generic_name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    manufacturer: { type: String, required: true },
    batch_number: { type: String, required: true },
    expiry_date: { type: Date, required: true },
    quantity_in_stock: { type: Number, required: true },
    reorder_level: { type: Number, required: true },
    unit_price: { type: Number, required: true },
    status: { type: String, enum: ["Available", "Out of Stock"], required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IDrugInventory>("DrugInventory", DrugInventorySchema);
