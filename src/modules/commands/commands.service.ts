import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from './command.entity';
import { Repository } from 'typeorm';
import { AxiomLogger } from 'src/providers/axiom-logger/axiom-logger';
import CommandDto from 'src/dto/command-input.dto';

@Injectable()
export class CommandsService {

    constructor(
        @InjectRepository(Command)
        private usersRepository: Repository<Command>, private logger: AxiomLogger
    ) { }

    async createCommand(command: CommandDto) {
        await this.usersRepository.insert(command).then(() => {
            this.logger.log('New Command Added');
            this.logger.logObjectorData([command]);
        });
    }

    async findAll() {
        return await this.usersRepository.find();
    }

    async findResponse(command) {
        return await this.usersRepository.findOneBy(command)
    }

}
