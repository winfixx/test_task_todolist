import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Task } from '../task.model'

export class CreateTaskDto {
    @ApiProperty({ example: 'Задача 1', description: 'Название задачи' })
    @IsString({ message: 'Должна быть строкой' })
    public readonly title: string

    @ApiProperty({ example: 'Описание 1', description: 'Описание задачи' })
    @IsOptional()
    @IsString({ message: 'Должна быть строкой' })
    public readonly content: string

    @ApiProperty({ example: 'pending', description: 'Статус задачи' })
    @IsOptional()
    @IsString({ message: 'Должна быть статусом' })
    public readonly status: Task['status']

    @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
    @IsNumber({}, { message: 'Должнo быть числом' })
    public readonly userId: number

    @ApiProperty({ example: '1', description: 'Идентификатор cписка задач' })
    @IsNumber({}, { message: 'Должнo быть числом' })
    public readonly listTasksId: number
}

export class ChangeTaskDto extends CreateTaskDto {
    @ApiProperty({ example: '1', description: 'Идентификатор задачи' })
    @IsNumber({}, { message: 'Должнo быть числом' })
    public readonly taskId: number
}