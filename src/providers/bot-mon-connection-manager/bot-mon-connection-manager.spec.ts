import { Test, TestingModule } from '@nestjs/testing';
import { BotMonConnectionManager } from './bot-mon-connection-manager';

describe('BotMonConnectionManager', () => {
    let provider: BotMonConnectionManager;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BotMonConnectionManager],
        }).compile();

        provider = module.get<BotMonConnectionManager>(BotMonConnectionManager);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
