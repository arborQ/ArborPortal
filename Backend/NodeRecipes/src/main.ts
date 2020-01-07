import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from 'mongoose';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  const options = new DocumentBuilder()
    .setTitle('Recipes example')
    .setDescription('Recipes example API description')
    .setVersion('1.0')
    .addTag('recipes')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`NodeRecipes run: http://localhost:${port}`);
  });
}
bootstrap();
