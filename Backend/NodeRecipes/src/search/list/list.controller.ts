import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizedGuard } from '../../authorized.guard';
import { ElasticSearchClientService } from '../../elastic-search-client/elastic-search-client.service';

@Controller('/api/recipes')
@UseGuards(AuthorizedGuard)
export class ListController {
    constructor(private readonly elasticSearch: ElasticSearchClientService) { }

    @Get()
    async findAll(): Promise<{
        totalCount: number,
        items: any[],
    }> {
        try {
            const results = await this.elasticSearch.search('recipes', '');

            return results;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }
}
