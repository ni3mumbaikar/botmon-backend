import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotMonConnectionManager } from './providers/bot-mon-connection-manager/bot-mon-connection-manager';
import { ConfigModule } from '@nestjs/config';
import { AxiomLogger } from './providers/axiom-logger/axiom-logger';
import { ConnectionModule } from './modules/connection/connection.module';
import { DatabaseModule } from './modules/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandsModule } from './modules/commands/commands.module';

@Module({
    imports: [ConfigModule.forRoot(), ConnectionModule, DatabaseModule, TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
    }), CommandsModule],
    controllers: [AppController],
    providers: [AppService, BotMonConnectionManager, AxiomLogger],
})
export class AppModule { }
