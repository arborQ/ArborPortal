import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { Config } from './config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [RecipesModule, DatabaseModule],
  providers: [Config],
})
export class AppModule { }
