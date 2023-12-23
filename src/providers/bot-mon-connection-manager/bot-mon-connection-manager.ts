import { Injectable } from '@nestjs/common';
import makeWASocket, {
    DisconnectReason,
    useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { AxiomLogger } from '../axiom-logger/axiom-logger';

@Injectable()
export class BotMonConnectionManager {
    private isConnected: boolean;
    private qr: string;

    constructor(private logger: AxiomLogger) {}

    public getisConnected(): boolean {
        return this.isConnected;
    }

    public getqr(): string {
        return this.qr;
    }

    public async initialize() {
        const { state, saveCreds } =
            await useMultiFileAuthState('auth_info_baileys');
        let sock = makeWASocket({
            printQRInTerminal: true,
            auth: state,
            defaultQueryTimeoutMs: undefined,
        });

        // this will be called as soon as the credentials are updated
        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect =
                    (lastDisconnect.error as Boom)?.output?.statusCode !==
                    DisconnectReason.loggedOut;
                console.log(
                    'connection closed due to ',
                    lastDisconnect.error,
                    ', reconnecting ',
                    shouldReconnect,
                );
            } else if (connection === 'open') {
                console.log('opened connection');
            }
            this.qr = update.qr;
            this.logger.log(this.qr);
            this.isConnected = update.connection === 'open';
        });

        sock.ev.on('messages.upsert', async (m) => {
            console.log(JSON.stringify(m, undefined, 2));

            console.log('replying to', m.messages[0].key.remoteJid);
            await sock.sendMessage(m.messages[0].key.remoteJid!, {
                text: 'Hello there!',
            });
        });
    }
}
