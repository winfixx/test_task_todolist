import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SequelizeModule } from '@nestjs/sequelize'
import { Task } from './task.model'
import { ListTasksModule } from 'src/list-tasks/list-tasks.module'

@Module({
  imports: [
    SequelizeModule.forFeature([
      Task
    ]),
    ListTasksModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
