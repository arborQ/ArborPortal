import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizedGuard } from '../../authorized.guard';

@Controller('/api/recipes')
@UseGuards(AuthorizedGuard)
export class ListController {
    @Get()
    findAll(): string[] {
        return [
            'some name',
            'some name',
            'some name',
            'some name',
        ];
    }
}
