import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from './command.entity';
import { AxiomLogger } from 'src/providers/axiom-logger/axiom-logger';
import { CommandsProcessor } from './provider/commands-processor/commands-processor';

@Module({
  imports: [TypeOrmModule.forFeature([Command])],
  providers: [CommandsService, AxiomLogger, CommandsProcessor],
  exports: [CommandsProcessor],
  controllers: [CommandsController]
})
export class CommandsModule { }
