import { Schema } from 'mongoose';
import { SizeSchema } from './size.schema'

export const WarehouseSchema = new Schema({
  coountry: String,
  state: String,
  city: String,
  colony: String,
  latitude: Number,
  longitude: Number,
  priceToKm: Number,
  range: Number,
  mini: SizeSchema,
  small: SizeSchema,
  middle: SizeSchema,
  big: SizeSchema,
  xBig: SizeSchema,
  plus: SizeSchema
})

