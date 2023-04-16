import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Warehouse } from './interfaces/warehouse.interface'
import { WarehouseDTO } from './dto/warehouse.dto'

@Injectable()
export class WarehouseService {

    constructor(@InjectModel('warehouse') private readonly warehouseModel: Model<Warehouse>) {

    }

    async createWarehouse(warehouseDTO: WarehouseDTO): Promise<Warehouse> {
        const newWarehouse = new this.warehouseModel(warehouseDTO);
        return newWarehouse.save();
    }

    async getWarehouse(lat: number, lng: number): Promise<Warehouse> {
        let states = await this.warehouseModel.findOne({})
        return states
    }
}
