import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
  available: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>("Product", productSchema);
