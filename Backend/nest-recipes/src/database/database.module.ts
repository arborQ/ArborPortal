import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '../config';

const mongoModule = MongooseModule.forRootAsync({
    imports: [Config],
    inject: [Config],
    useFactory: async (config: Config) => ({
        uri: config.mongoConnectionString,
    }),
});

@Module({
    imports: [
        mongoModule,
    ],
})

export class DatabaseModule { }
