import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotMonConnectionManager } from './providers/bot-mon-connection-manager/bot-mon-connection-manager';
import { ConfigModule } from '@nestjs/config';
import { AxiomLogger } from './providers/axiom-logger/axiom-logger';
import { ConnectionModule } from './modules/connection/connection.module';

@Module({
    imports: [ConfigModule.forRoot(), ConnectionModule],
    controllers: [AppController],
    providers: [AppService, BotMonConnectionManager, AxiomLogger],
})
export class AppModule { }
