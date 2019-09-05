import { Test, TestingModule } from '@nestjs/testing';
import { ElasticSearchClientService } from './elastic-search-client.service';

describe('ElasticSearchClientService', () => {
  let service: ElasticSearchClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElasticSearchClientService],
    }).compile();

    service = module.get<ElasticSearchClientService>(ElasticSearchClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
