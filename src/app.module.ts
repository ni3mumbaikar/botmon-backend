import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './connection/connection.service';
import { ConnectionController } from './connection/connection.controller';
import { BotMonConnectionManager } from './providers/bot-mon-connection-manager/bot-mon-connection-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AppController, ConnectionController],
    providers: [AppService, ConnectionService, BotMonConnectionManager],
})
export class AppModule {}
