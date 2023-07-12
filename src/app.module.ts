import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { FishesModule } from './fishes/fishes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@dodo-api.rssmxky.mongodb.net/`,
      { dbName: 'dodo-api' },
    ),
    FishesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
