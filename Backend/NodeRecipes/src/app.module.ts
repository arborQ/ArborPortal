import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ModifyModule } from './modify/modify.module';
import { UserContextMiddleware } from './user-context.middleware';

@Module({
  imports: [SearchModule, ModifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
