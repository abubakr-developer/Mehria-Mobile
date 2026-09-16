import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  id: string; // slug identifier e.g. "chargers"
  label: string;
  description: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    id: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
