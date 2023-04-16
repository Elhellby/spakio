import {SizeDTO} from './size.dto'

export class WarehouseDTO {

    readonly coountry: string;
     readonly state: string;
     readonly city: string;
     readonly colony: string;
     readonly latitude: number;
     readonly longitude: number;
     readonly priceToKm: number;
     readonly range: number;
     readonly mini: SizeDTO;
     readonly small: SizeDTO;
     readonly middle: SizeDTO;
     readonly big: SizeDTO;
     readonly xBig: SizeDTO;
     readonly plus: SizeDTO;
}