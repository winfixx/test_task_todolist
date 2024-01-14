import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ListTasksService } from 'src/list-tasks/list-tasks.service'
import { ChangeTaskDto, CreateTaskDto } from './dto/create-task.dto'
import { Task } from './task.model'

@Injectable()
export class TaskService {

    constructor(
        @InjectModel(Task) private taskRepository: typeof Task,
        private readonly listTasksService: ListTasksService
    ) { }

    public async createTask({
        content,
        listTasksId,
        title,
        userId,
    }: CreateTaskDto) {
        const listTasks = await this.listTasksService.findOneListTasksById(listTasksId)
        this.listTasksService.allowChangeLists(userId, listTasks.userId)

        const task = await this.taskRepository.create({
            title,
            content,
            listTasksId: listTasks.id,
            status: 'pending'
        })

        return task
    }

    public async updateTask({
        listTasksId,
        title,
        content,
        status,
        userId,
        taskId
    }: ChangeTaskDto) {
        await this.allowChangeTask(userId, listTasksId)

        const task = await this.findOneTaskById(taskId)

        if (title) await task.update({ title })
        if (content) await task.update({ content })
        if (status) await task.update({ status })

        return task
    }

    public async deleteTask({
        taskId,
        userId,
        listTasksId
    }: Pick<ChangeTaskDto, 'taskId' | 'userId' | 'listTasksId'>) {
        await this.allowChangeTask(userId, listTasksId)

        const task = await this.findOneTaskById(taskId)
        await task.destroy()

        return task
    }

    public async findOneTaskById(
        taskId: number
    ) {
        const task = await this.taskRepository.findByPk(taskId)

        if (!task) throw new BadRequestException('Такого ресурса не существует')

        return task
    }

    private async allowChangeTask(
        userId: number,
        listTasksId: number
    ) {
        const listTasks = await this.listTasksService.findOneListTasksById(listTasksId)
        this.listTasksService.allowChangeLists(userId, listTasks.userId)
    }
}
