import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Axiom } from '@axiomhq/js';
import { AxiomLogger } from './providers/axiom-logger/axiom-logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
    });
    await app.listen(3000);
}

bootstrap();
