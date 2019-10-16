import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from 'mongoose';
import configService from './config/config.service';

const { port } = configService;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    await connect(configService.mongoConnectionString, { useNewUrlParser: true });
  } catch {
    // tslint:disable-next-line:no-console
    console.log('Cant connect to mongoDb');
  }
  await app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`NodeRecipes run: http://localhost:${port}`);
  });
}
bootstrap();
