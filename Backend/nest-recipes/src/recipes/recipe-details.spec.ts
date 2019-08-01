import { Test, TestingModule } from '@nestjs/testing';
import { RecipeDetails } from './recipe-details';

describe('RecipeDetails', () => {
  let provider: RecipeDetails;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeDetails],
    }).compile();

    provider = module.get<RecipeDetails>(RecipeDetails);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
