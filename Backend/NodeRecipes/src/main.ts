import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from 'mongoose';
import configService from './config/config.service';
import * as Agenda from 'agenda';
import regenerateRecipes from '../schedulers/regenerate.recipes';

const agenda = new Agenda({
  db: {
    address: 'mongodb://localhost:27017/Agenda'
  },
}).processEvery('30 seconds');

agenda.define('recalculate recipes', async (job, done) => {
  await regenerateRecipes();
});

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

(async () => {
  await agenda.start();
  const job = agenda.create('recalculate recipes', { userCount: 100 });
  await job.repeatEvery('30 seconds');
  await job.save();
})();
