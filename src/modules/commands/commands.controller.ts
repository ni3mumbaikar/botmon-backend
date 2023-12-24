import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { Command } from './command.entity';
import { DatabaseFilter } from '../database/filter/database/database.filter'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import CommandDto from 'src/dto/command-input.dto';
import CommandOnlyDto from 'src/dto/command-only.dto';

@Controller('commands')
@ApiTags('Command')
@UseFilters(DatabaseFilter)
export class CommandsController {

    constructor(private commandService: CommandsService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new command' })
    @ApiResponse({ status: 201, description: 'Command created' })
    @ApiResponse({ status: 403, description: 'Invalid or Duplicate command' })
    createCommand(@Body() command: CommandDto) {
        return this.commandService.createCommand(command);
    }

    @Get('fetch')
    @ApiOperation({ summary: 'Get all available commands' })
    @ApiResponse({ status: 200, description: 'List of all commands and their responses' })
    findAll() {
        return this.commandService.findAll();
    }

    @Post('/fetch/byCommand')
    @ApiBody({ type: CommandOnlyDto, description: 'provide command for getting its respective response value' })
    @ApiOperation({ summary: 'Get response of the command by command name' })
    @ApiResponse({ status: 200, description: 'Get id, command and response of the command' })
    findResponse(@Body() command: CommandOnlyDto) {
        return this.commandService.findResponse(command);
    }

}
