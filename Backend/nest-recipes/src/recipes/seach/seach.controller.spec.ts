import { Test, TestingModule } from '@nestjs/testing';
import { SeachController } from './seach.controller';

describe('Seach Controller', () => {
  let controller: SeachController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeachController],
    }).compile();

    controller = module.get<SeachController>(SeachController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
