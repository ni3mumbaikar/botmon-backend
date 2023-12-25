import { Module } from '@nestjs/common';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';
import { BotMonConnectionManager } from 'src/providers/bot-mon-connection-manager/bot-mon-connection-manager';
import { AxiomLogger } from 'src/providers/axiom-logger/axiom-logger';
import { AppService } from 'src/app.service';
import { CommandsModule } from '../commands/commands.module';

@Module({
    imports: [CommandsModule],
    controllers: [ConnectionController],
    providers: [AxiomLogger, BotMonConnectionManager, ConnectionService],
    exports: [ConnectionService],
})
export class ConnectionModule { }
