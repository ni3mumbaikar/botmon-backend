import { Controller, Get } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { BotMonConnectionManager } from 'src/providers/bot-mon-connection-manager/bot-mon-connection-manager';

@Controller('connection')
export class ConnectionController {
    constructor(private connectionService: ConnectionService) {}

    @Get('/get/qr')
    getQR(): string {
        return this.connectionService.getQR();
    }

    @Get('/start/session')
    startSession() {
        return this.connectionService.startSession();
    }
}
