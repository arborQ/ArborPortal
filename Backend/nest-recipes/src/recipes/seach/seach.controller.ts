import { Controller, Get } from '@nestjs/common';

@Controller('api/search')
export class SeachController {
    @Get()
    search(): string {
        return 'search works ';
    }
}
