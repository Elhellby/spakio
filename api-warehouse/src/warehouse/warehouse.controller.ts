import { Controller, Get, Post, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { WarehouseDTO } from './dto/warehouse.dto';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {

    constructor(private warehouseService: WarehouseService) { }

    @Post('/create')
    async create(@Res() res, @Body() warehouseDTO: WarehouseDTO) {
        console.log(warehouseDTO)
        const product = await this.warehouseService.createWarehouse(warehouseDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Warehouse Successfully Created',
            product
        });
    }

    @Get('/:lat/:lng')
    async getWarehouse(
        @Res() res, 
        @Param('lat') lat: number,
        @Param('lng') lng: number
    ): Promise<WarehouseDTO> {
        let warehouses = await this.warehouseService.getWarehouse(lat,lng)
        return res.status(HttpStatus.OK).json(warehouses)
    }
}
