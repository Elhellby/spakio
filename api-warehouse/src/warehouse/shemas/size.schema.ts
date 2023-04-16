import { Schema } from 'mongoose';

export const SizeSchema = new Schema({
  enable: Boolean,
  price: Number,
  height: Number,
  width: Number
})

