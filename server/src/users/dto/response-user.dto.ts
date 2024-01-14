import { ApiProperty } from '@nestjs/swagger/dist'

export class ResponseUserDto {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    public readonly id: string

    @ApiProperty({ example: 'test@test.test', description: 'Email' })
    public readonly email: string

    @ApiProperty({ example: 'vdfnbvdbdubn', description: 'Токен доступа' })
    public readonly accessToken: string
}