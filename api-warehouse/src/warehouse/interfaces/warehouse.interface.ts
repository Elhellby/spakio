import { Document } from "mongoose";
import {Size} from './size.interface'

export interface Warehouse extends Document {
     readonly coountry: String;
     readonly state: String;
     readonly city: String;
     readonly colony: String;
     readonly latitude: Number;
     readonly longitude: Number;
     readonly priceToKm: Number;
     readonly range: Number;
     readonly mini: Size;
     readonly small: Size;
     readonly middle: Size;
     readonly big: Size;
     readonly xBig: Size;
     readonly plus: Size;
}