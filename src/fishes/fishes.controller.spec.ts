import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';

import { FishesController } from './fishes.controller';
import { FishesService } from './fishes.service';
import { Fish, FishSchema } from './schemas/fish.schema';
import { FishDtoStub } from '../../test/stubs/fish.dto.stub';

describe('FishesController', () => {
  let fishesController: FishesController;
  let mongodb: MongoMemoryServer;
  let mongoConnection: Connection;
  let fishModel: Model<Fish>;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    mongoConnection = (await connect(uri)).connection;
    fishModel = mongoConnection.model('Fish', FishSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FishesController],
      providers: [
        FishesService,
        { provide: getModelToken('Fish'), useValue: fishModel },
      ],
    }).compile();
    fishesController = app.get<FishesController>(FishesController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongodb.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('getFishes', () => {
    it('should return  all fishes in database', async () => {
      await new fishModel(FishDtoStub()).save();
      const fishes = await fishesController.getFishes({});
      expect(fishes).toHaveLength(1);
    });
  });
});
