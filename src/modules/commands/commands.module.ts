import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from './command.entity';
import { AxiomLogger } from 'src/providers/axiom-logger/axiom-logger';

@Module({
  imports: [TypeOrmModule.forFeature([Command])],
  providers: [CommandsService, AxiomLogger],
  controllers: [CommandsController]
})
export class CommandsModule { }
