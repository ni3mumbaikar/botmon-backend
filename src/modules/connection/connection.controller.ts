import { Controller, Get } from '@nestjs/common';
import { ConnectionService } from './connection.service';
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
    @ApiResponse({ status: 200, description: 'Session started' })
    startSession() {
        return this.connectionService.startSession();
    }

    @Get('/stop/session')
    @ApiOperation({ summary: 'Stop WA session' })
    @ApiResponse({ status: 200, description: 'Session stopped' })
    stopSession() {
        return this.connectionService.stopSession();
    }

    @Get('/state/session')
    @ApiOperation({ summary: 'Get WA session state' })
    @ApiResponse({ status: 200, description: 'Session state' })
    getSession() {
        return this.connectionService.getSession();
    }

}
