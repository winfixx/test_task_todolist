import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Task } from 'src/task/task.model'
import { ChangeListTasksDto, CreateListTasksDto } from './dto/create-list-tasks.dto'
import { ListTasks } from './list-tasks.model'

@Injectable()
export class ListTasksService {

    constructor(
        @InjectModel(ListTasks) private listTasksRepository: typeof ListTasks
    ) { }

    public async createListTasks({
        title,
        userId
    }: CreateListTasksDto) {
        const listTasks = await this.listTasksRepository.create({ title, userId })
        return listTasks
    }

    public async updateTitleListTasks({
        title,
        userId,
        listId
    }: ChangeListTasksDto) {
        const listTasks = await this.findOneListTasksById(listId)
        this.allowChangeLists(userId, listTasks.userId)

        await listTasks.update({ title })

        return listTasks
    }

    public async deleteListTasks({
        userId,
        listId
    }: Omit<ChangeListTasksDto, 'title'>) {
        const listTasks = await this.findOneListTasksById(listId)

        this.allowChangeLists(userId, listTasks.userId)

        await listTasks.destroy()

        return listTasks
    }

    public async findOneListTasksById(
        id: number
    ) {
        const listTasks = await this.listTasksRepository.findByPk(
            +id,
            {
                include: Task
            }
        )

        if (!listTasks) throw new BadRequestException('Такого ресурса не существует')

        return listTasks
    }

    public async findAllListsTasks(
        userId: number
    ) {
        return await this.listTasksRepository.findAll(
            {
                where: { userId },
                include: Task
            }
        )
    }

    public allowChangeLists(
        userId: number,
        authorId: number
    ) {
        if (userId !== authorId) throw new ForbiddenException('Функция недоступна. Вы не создатель списка.')
    }
}
