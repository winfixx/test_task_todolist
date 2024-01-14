import { ApiProperty } from '@nestjs/swagger/dist'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ListTasks } from 'src/list-tasks/list-tasks.model'
import { CreateUserDto } from './dto/create-user.dto'

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User, CreateUserDto> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    public id: number

    @ApiProperty({ example: 'test@test.test', description: 'Email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    public email: string

    @ApiProperty({ example: '12345', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    public password: string

    @HasMany(() => ListTasks)
    public listsTasks: ListTasks[]
}