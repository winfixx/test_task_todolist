import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'
import { User } from './users/users.model'
import { ListTasks } from './list-tasks/list-tasks.model'
import { Task } from './task/task.model'

export const getSequelizeConfig = async (
    config: ConfigService
): Promise<SequelizeModuleOptions> => {
    const host = config.get<string>('POSTGRES_HOST')
    const port = +config.get<string>('POSTGRES_PORT')
    const username = config.get<string>('POSTGRES_USER')
    const password = config.get<string>('POSTGRES_PASSWORD')
    const database = config.get<string>('POSTGRES_DB')

    return {
        dialect: 'postgres',
        host,
        port,
        username,
        password,
        database,
        models: [
            User,
            ListTasks,
            Task
        ],
        // autoLoadModels: true,
        // sync: { force: true }
    }
}