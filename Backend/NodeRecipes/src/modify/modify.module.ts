import { Module } from '@nestjs/common';
import { EditController } from './edit/edit.controller';
import { CreateController } from './create/create.controller';
import { DeleteController } from './delete/delete.controller';
import { ElasticSearchClientService } from '../elastic-search-client/elastic-search-client.service';

@Module({
  controllers: [
    EditController,
    CreateController,
    DeleteController,
  ],
  providers: [ElasticSearchClientService]
})
export class ModifyModule { }
