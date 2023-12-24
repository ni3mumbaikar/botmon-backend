import { Module } from '@nestjs/common';
import { AxiomLogger } from 'src/providers/axiom-logger/axiom-logger';

@Module({
    providers: [AxiomLogger],
})
export class DatabaseModule { }
