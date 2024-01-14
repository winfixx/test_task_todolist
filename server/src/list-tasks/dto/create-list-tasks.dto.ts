import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateListTasksDto {
    @ApiProperty({ example: 'Список', description: 'Название списка задач' })
    @IsString({ message: 'Должна быть строкой' })
    public readonly title: string

    @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
    @IsNumber({}, { message: 'Должнo быть числом' })
    public readonly userId: number
}

export class ChangeListTasksDto extends CreateListTasksDto {
    @ApiProperty({ example: '1', description: 'Идентификатор списка' })
    @IsNumber({}, { message: 'Должнo быть числом' })
    public readonly listId: number
}