import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  tag: string | null;
  tagColor: string;
  tagText: string;
  category: string;
  rating: number;
  reviews: number;
  img: string;
  description: string;
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, default: null },
    tag: { type: String, default: null },
    tagColor: { type: String, default: "#00C2D1" },
    tagText: { type: String, default: "#3C3837" },
    category: { type: String, required: true, index: true },
    rating: { type: Number, default: 5.0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    img: { type: String, required: true },
    description: { type: String, default: "" },
    inStock: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
