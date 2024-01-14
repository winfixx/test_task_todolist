import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ListTasksController } from './list-tasks.controller'
import { ListTasks } from './list-tasks.model'
import { ListTasksService } from './list-tasks.service'

@Module({
  imports: [
    SequelizeModule.forFeature([
      ListTasks
    ])
  ],
  controllers: [ListTasksController],
  providers: [ListTasksService],
  exports: [ListTasksService]
})
export class ListTasksModule { }
