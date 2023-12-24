import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { Command } from './command.entity';
import { DatabaseFilter } from '../database/filter/database/database.filter'

@Controller('commands')
@UseFilters(DatabaseFilter)
export class CommandsController {

    constructor(private commandService: CommandsService) { }

    @Post('create')
    createCommand(@Body() command: Command) {
        return this.commandService.createCommand(command);
    }

    @Get('fetch')
    findAll() {
        return this.commandService.findAll();
    }

    @Get('/fetch/byCommand')
    findResponse(@Body() command) {
        return this.commandService.findResponse(command);
    }

}
