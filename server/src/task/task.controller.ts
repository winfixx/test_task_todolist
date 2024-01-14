import { Body, Controller, Delete, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ChangeTaskDto, CreateTaskDto } from './dto/create-task.dto'
import { TaskService } from './task.service'

@ApiTags('Задачи')
@Controller('task')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class TaskController {

    constructor(
        private readonly taskService: TaskService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Создание задачи' })
    public createTask(
        @Body() createTask: CreateTaskDto
    ) {
        const task = this.taskService.createTask(createTask)
        return task
    }

    @Patch('update')
    public updateTask(
        @Body() changeTask: ChangeTaskDto
    ) {
        const task = this.taskService.updateTask(changeTask)
        return task
    }

    @Delete()
    @ApiOperation({ summary: 'Удаление задачи' })
    public deleteTask(
        @Query('userId', ParseIntPipe) userId: number,
        @Query('taskId', ParseIntPipe) taskId: number,
        @Query('listTasksId', ParseIntPipe) listTasksId: number
    ) {
        const task = this.taskService.deleteTask({ userId, taskId, listTasksId })
        return task
    }

    // @Get(':listId')
    // findOneListTasksById(
    //     @Param('listId', ParseIntPipe) listId: number,
    // ) {
    //     const task = this.listTasksService.findOneListTasksById(listId)
    //     return task
    // }

    // @Get()
    // findAllListsTasks(
    //     @Query('userId', ParseIntPipe) userId: number,
    // ) {
    //     const task = this.listTasksService.findAllListsTasks(userId)
    //     return task
    // }
}
