import { Controller, Get } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { BotMonConnectionManager } from 'src/providers/bot-mon-connection-manager/bot-mon-connection-manager';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('connection')
@ApiTags('Connection')
export class ConnectionController {
    constructor(private connectionService: ConnectionService) { }

    @Get('/get/qr')
    @ApiOperation({ summary: 'Get QR code string' })
    @ApiResponse({ status: 200, description: 'New/Updated Qr code string' })
    @ApiResponse({ status: 304, description: 'Qr code string unchanged' })
    getQR(): string {
        return this.connectionService.getQR();
    }

    @Get('/start/session')
    @ApiOperation({ summary: 'Start new WA session' })
    @ApiResponse({ status: 200, description: 'Sesion started' })
    startSession() {
        return this.connectionService.startSession();
    }
}
