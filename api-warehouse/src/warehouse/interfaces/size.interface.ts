import { Document } from "mongoose";

export interface Size extends Document {
     readonly enable: Boolean;
     readonly price: Number;
     readonly height: Number;
     readonly width: Number;
}