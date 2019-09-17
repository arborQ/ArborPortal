import * as Agenda from 'agenda';
import regenerateRecipes from '../schedulers/regenerate.recipes';
import { connect } from 'mongoose';
import configService from './config/config.service';

const agenda = new Agenda({
    db: {
        address: 'mongodb://localhost:27017/Agenda',
    },
}).processEvery('30 seconds');

agenda.define('recalculate recipes', async (job, done) => {
    await regenerateRecipes();
});
console.log('JOB STARTS');
(async () => {
    await connect(configService.mongoConnectionString, { useNewUrlParser: true });
    await agenda.start();
    const job = agenda.create('recalculate recipes', { userCount: 100 });
    job.repeatEvery('30 seconds');
    await job.save();
    console.log('JOB STARTS: 30 seconds');
})();
