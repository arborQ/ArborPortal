import { Controller, Get, UseGuards, Query, Req } from '@nestjs/common';
import { AuthorizedGuard } from '../../authorized.guard';
import { ElasticSearchClientService } from '../../elastic-search-client/elastic-search-client.service';
import { Request } from 'express';

@Controller('/api/recipes')
@UseGuards(AuthorizedGuard)
export class ListController {
    constructor(private readonly elasticSearch: ElasticSearchClientService) { }

    @Get()
    async findAll(@Query('search') search: string, @Req() req: Request): Promise<{
        totalCount: number,
        items: any[],
    }> {
        try {
            const results = await this.elasticSearch.search('recipes', search);
            console.log(results);
            return results;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }
}
