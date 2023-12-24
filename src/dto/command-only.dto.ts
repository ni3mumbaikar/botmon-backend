import { ApiProperty } from "@nestjs/swagger";

export default class CommandOnlyDto {
    @ApiProperty({ description: 'The actual command' })
    readonly command: string
}