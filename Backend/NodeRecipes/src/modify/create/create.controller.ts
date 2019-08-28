import { Controller, Post } from '@nestjs/common';

@Controller('/api/recipes')
export class CreateController {
    @Post()
    createNewRecipe(): number {
        return 1;
    }
}
