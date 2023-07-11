import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FishesController } from './fishes.controller';
import { FishesService } from './fishes.service';
import { FishSchema } from './schemas/fish.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Fish', schema: FishSchema}])],
  controllers: [FishesController],
  providers: [FishesService],
  exports: [FishesService],
})
export class FishesModule {}
