import { Module } from '@nestjs/common';
import { EditController } from './edit/edit.controller';
import { CreateController } from './create/create.controller';
import { DeleteController } from './delete/delete.controller';

@Module({
  controllers: [
    EditController,
    CreateController,
    DeleteController,
  ]
})
export class ModifyModule {}
