import { ApiProperty } from "@nestjs/swagger";

export default class CommandDto {
    @ApiProperty({ description: 'The actual command' })
    readonly command: string
    @ApiProperty({ description: 'The response of the command' })
    readonly response: string
}