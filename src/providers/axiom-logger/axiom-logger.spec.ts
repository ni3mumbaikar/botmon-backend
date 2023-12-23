import { Test, TestingModule } from '@nestjs/testing';
import { AxiomLogger } from './axiom-logger';

describe('AxiomLogger', () => {
    let provider: AxiomLogger;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AxiomLogger],
        }).compile();

        provider = module.get<AxiomLogger>(AxiomLogger);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
