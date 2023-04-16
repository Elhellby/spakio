import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostalcodeModule } from './postalcode/postalcode.module';
import { MongooseModule } from '@nestjs/mongoose'
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [
    PostalcodeModule,
    MongooseModule.forRoot(
      'mongodb+srv://cluster0.dxdumw0.mongodb.net',//   adminDataBase:Password01@cluster0.dxdumw0.mongodb.net/?retryWrites=true&w=majority',
      {
        user:'adminDataBase',
        pass:'Password01',
        dbName: 'spakio',
        w:'majority',
        retryWrites:true
      }
    ),
    WarehouseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
