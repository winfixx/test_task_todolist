import { ApiProperty } from '@nestjs/swagger/dist'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ListTasks } from 'src/list-tasks/list-tasks.model'

@Table({ tableName: 'task', createdAt: false, updatedAt: false })
export class Task extends Model<Task> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    public id: number

    @ApiProperty({ example: 'task', description: 'Название задачи' })
    @Column({ type: DataType.STRING, allowNull: false })
    public  title: string

    @ApiProperty({ example: 'Покушать', description: 'Описание задачи' })
    @Column({ type: DataType.STRING, defaultValue: '' })
    public content: string

    @ApiProperty({ example: 'pending', description: 'Статус' })
    @Column({ type: DataType.STRING })
    public status: 'fulfilled' | 'in progress' | 'pending'

    @ForeignKey(() => ListTasks)
    @Column({ type: DataType.INTEGER })
    public listTasksId: number
    @BelongsTo(() => ListTasks)
    public listTasks: ListTasks
}