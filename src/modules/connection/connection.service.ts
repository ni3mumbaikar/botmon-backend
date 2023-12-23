import { Injectable } from '@nestjs/common';
import { BotMonConnectionManager } from 'src/providers/bot-mon-connection-manager/bot-mon-connection-manager';
import { Boom } from '@hapi/boom';

@Injectable()
export class ConnectionService {
    async startSession() {
        await this.botmon.initialize();
    }

    constructor(private botmon: BotMonConnectionManager) {}

    qrString: string = null;

    getQR(): string {
        return this.botmon.getqr();
    }
}
