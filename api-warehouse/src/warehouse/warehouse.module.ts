import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseSchema } from './shemas/warehouse.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'warehouse', schema:WarehouseSchema}])],
  providers: [WarehouseService],
  controllers: [WarehouseController]
})
export class WarehouseModule {}
