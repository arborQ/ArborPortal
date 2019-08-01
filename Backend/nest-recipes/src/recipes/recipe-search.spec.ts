import { Test, TestingModule } from '@nestjs/testing';
import { RecipeSearch } from './recipe-search';

describe('RecipeSearch', () => {
  let provider: RecipeSearch;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeSearch],
    }).compile();

    provider = module.get<RecipeSearch>(RecipeSearch);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
