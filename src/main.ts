import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
    });
    const config = new DocumentBuilder()
        .setTitle('BotMon')
        .setDescription('The APIs to interact with Whatsapp bot 🤖')
        .addTag('Command', 'Endpoints related to commands 💻')
        .addTag('Connection', 'Endpoints related to connection 🌍')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}

bootstrap();
