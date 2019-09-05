import { Module } from '@nestjs/common';
import { ListController } from './list/list.controller';
import { ElasticSearchClientService } from '../elastic-search-client/elastic-search-client.service';

@Module({
  controllers: [ListController],
  providers: [ElasticSearchClientService]
})
export class SearchModule { }
