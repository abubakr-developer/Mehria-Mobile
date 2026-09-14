import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStoreSetting extends Document {
  storeName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  deliveryFee: number;
  announcementText: string;
  announcementEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StoreSettingSchema = new Schema<IStoreSetting>(
  {
    storeName: { type: String, default: "Mehria Mobiles" },
    phone: { type: String, default: "+92 300 1234567" },
    email: { type: String, default: "mehriamobiles@gmail.com" },
    address: {
      type: String,
      default: "Main Bazar, Near Ghalla Mandi, Lodhran",
    },
    city: { type: String, default: "Lodhran" },
    deliveryFee: { type: Number, default: 0 },
    announcementText: {
      type: String,
      default: "Free Express Delivery on orders across Pakistan!",
    },
    announcementEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const StoreSetting: Model<IStoreSetting> =
  mongoose.models.StoreSetting ||
  mongoose.model<IStoreSetting>("StoreSetting", StoreSettingSchema);
