import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizedGuard } from '../../authorized.guard';

interface IRecipe {
    id: number;
    recipeName: string;
    mainFileName?: string;
}

@Controller('/api/recipes')
@UseGuards(AuthorizedGuard)
export class ListController {
    @Get()
    findAll(): {
        totalCount: number,
        items: IRecipe[],
    } {
        const recipres: IRecipe[] = [
            {
                id: 1,
                recipeName: 'Gulasz',
            },
            {
                id: 2,
                recipeName: 'Karkówka',
            },
            {
                id: 3,
                recipeName: 'Rosół',
            },
            {
                id: 4,
                recipeName: 'Flaczki drobiowe',
            },
        ];

        return {
            totalCount: recipres.length,
            items: recipres,
        }
    }
}
