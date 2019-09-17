import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from 'mongoose';
import configService from './config/config.service';

const { port } = configService;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connect(configService.mongoConnectionString, { useNewUrlParser: true });
  await app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`NodeRecipes run: http://localhost:${port}`);
  });
}
bootstrap();
