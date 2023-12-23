import { Injectable } from '@nestjs/common';
import makeWASocket, {
    DisconnectReason,
    useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';

@Injectable()
export class BotMonConnectionManager {
    private isConnected: boolean;
    private static qr: string;

    public getisConnected(): boolean {
        return this.isConnected;
    }

    public getqr(): string {
        console.log('QR', BotMonConnectionManager.qr);
        return BotMonConnectionManager.qr;
    }

    public async initialize() {
        const { state, saveCreds } =
            await useMultiFileAuthState('auth_info_baileys');
        // will use the given state to connect
        // so if valid credentials are available -- it'll connect without QR
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
            BotMonConnectionManager.qr = update.qr;
            this.isConnected = update.isOnline;
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
