import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { Config } from './config';

@Module({
  imports: [RecipesModule],
  providers: [Config],
})
export class AppModule { }
