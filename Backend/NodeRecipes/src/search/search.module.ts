import { Module } from '@nestjs/common';
import { ListController } from './list/list.controller';

@Module({
  controllers: [ListController]
})
export class SearchModule {}
