import { Delete, Injectable, Param } from '@nestjs/common';
import makeWASocket, {
    Browsers,
    DisconnectReason,
    useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { AxiomLogger } from '../axiom-logger/axiom-logger';
import * as fs from 'fs';

@Injectable()
export class BotMonConnectionManager {
    private isConnected: boolean;
    private qr: string;

    constructor(private logger: AxiomLogger) { }

    public getisConnected(): boolean {
        return this.isConnected;
    }

    public getqr(): string {
        return this.qr;
    }

    async clearCredentials() {
        await fs.rmSync('./auth_info_baileys', { recursive: true, force: true });
    }

    public async initialize() {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
        // const waConfig = { version: [2, 2323, 4], auth: state, printQRInTerminal: true, browser: Browsers.ubuntu('Chrome'), }
        let sock = makeWASocket({
            version: [2, 2323, 4], auth: state, printQRInTerminal: true, browser: Browsers.ubuntu('Chrome'),
        });

        // this will be called as soon as the credentials are updated
        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect =
                    (lastDisconnect.error as Boom)?.output?.statusCode !==
                    DisconnectReason.loggedOut;

                this.logger.error('connection closed due to ' +
                    lastDisconnect.error +
                    ', reconnecting ' +
                    shouldReconnect)

                this.isConnected = false;
                if (shouldReconnect) {
                    this.initialize()
                }
            } else if (connection === 'open') {
                this.logger.log('opened connection');
                this.isConnected = true;
            }
            this.qr = update.qr;
            this.logger.log(this.qr);
        });

        sock.ev.on('messages.upsert', async (m) => {

        });
    }
}
