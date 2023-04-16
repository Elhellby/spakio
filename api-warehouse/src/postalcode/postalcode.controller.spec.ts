import { Test, TestingModule } from '@nestjs/testing';
import { PostalcodeController } from './postalcode.controller';

describe('PostalcodeController', () => {
  let controller: PostalcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostalcodeController],
    }).compile();

    controller = module.get<PostalcodeController>(PostalcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
