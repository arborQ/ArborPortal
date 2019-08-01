import { Controller, Get } from '@nestjs/common';
import { Config } from '../../config';

@Controller('api/search')
export class SeachController {
    constructor(
        private configure: Config,
    ) { }

    @Get()
    search(): string {
        return 'search works ' + this.configure.port;
    }
}
