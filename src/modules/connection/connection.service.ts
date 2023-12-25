import { Injectable } from '@nestjs/common';
import { BotMonConnectionManager } from 'src/providers/bot-mon-connection-manager/bot-mon-connection-manager';
import { Boom } from '@hapi/boom';

@Injectable()
export class ConnectionService {

    getSession() {
        return this.botmon.getisConnected();
    }

    async startSession() {
        await this.botmon.initialize();
    }

    async stopSession() {
        await this.botmon.clearCredentials()
    }

    constructor(private botmon: BotMonConnectionManager) { }

    qrString: string = null;

    getQR(): string {
        return this.botmon.getqr();
    }
}
