import { Test, TestingModule } from '@nestjs/testing';
import { CreateController } from './create.controller';

describe('Create Controller', () => {
  let controller: CreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateController],
    }).compile();

    controller = module.get<CreateController>(CreateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
