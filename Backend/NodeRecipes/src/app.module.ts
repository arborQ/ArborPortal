import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ModifyModule } from './modify/modify.module';
import { UserContextMiddleware } from './user-context.middleware';
import { ElasticSearchClientService } from './elastic-search-client/elastic-search-client.service';

@Module({
  imports: [SearchModule, ModifyModule],
  controllers: [AppController],
  providers: [AppService, ElasticSearchClientService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
