import { Module } from '@nestjs/common';
import { PostalcodeController } from './postalcode.controller';
import { PostalcodeService } from './postalcode.service';

// MONGOOSE
import { MongooseModule } from '@nestjs/mongoose';
import { PostalcodeSchema } from './shemas/postalcode.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'postalcode', schema: PostalcodeSchema}])],
  controllers: [PostalcodeController],
  providers: [PostalcodeService]
})
export class PostalcodeModule { }
