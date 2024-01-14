import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module'
import { ListTasksModule } from './list-tasks/list-tasks.module'
import { getSequelizeConfig } from './sequelize.config'
import { TaskModule } from './task/task.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getSequelizeConfig
    }),
    UsersModule,
    AuthModule,
    ListTasksModule,
    TaskModule
  ]
})
export class AppModule { }
