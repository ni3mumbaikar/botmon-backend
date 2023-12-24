import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';

@Entity()
@Unique('constraint_uniques_command', ['command'])
export class Command {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    command: string;

    @Column()
    response: string;

}