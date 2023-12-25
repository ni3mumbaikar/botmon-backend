import { Injectable } from '@nestjs/common';
import { Command } from '../../command.entity';
import { AxiomLogger } from 'src/providers/axiom-logger/axiom-logger';
import { CommandsService } from '../../commands.service';

@Injectable()
export class CommandsProcessor {

    constructor(private commandsService: CommandsService, private logger: AxiomLogger) { }

    static commands: Command[]

    async setUpCommands() {
        await this.commandsService.findAll()
            .then((res) => { CommandsProcessor.commands = res });
    }

    genericProcessor(m) {
        if (m.messages[0].message.conversation) {
            let command = CommandsProcessor.commands.filter(cmd => cmd.command == m.messages[0].message.conversation)
            if (command && command[0]) {
                console.log(CommandsProcessor.commands)
                this.logger.log('Sending Response: ' + command[0].response)
            }
        }
        this.logger.log(m);
    }
}
