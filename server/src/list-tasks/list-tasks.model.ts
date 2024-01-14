import { ApiProperty } from '@nestjs/swagger/dist'
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Task } from 'src/task/task.model'
import { User } from 'src/users/users.model'

@Table({ tableName: 'listTasks', createdAt: false, updatedAt: false })
export class ListTasks extends Model<ListTasks> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    public id: number

    @ApiProperty({ example: 'task', description: 'Название списка задач' })
    @Column({ type: DataType.STRING, allowNull: false })
    public title: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    public userId: number
    @BelongsTo(() => User)
    public user: User

    @HasMany(() => Task)
    public tasks: Task[]
}