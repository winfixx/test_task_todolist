import { ROUTE_TASK } from '../constants'
import { Task, TaskArgs } from '../types/Task'
import { api } from './api'

class TaskApi {
    public async createTask(taskArgs: Omit<TaskArgs, 'taskId' | 'status'>) {
        const { data: listTasks } = await api.post<Task>(`/${ROUTE_TASK}`, taskArgs)
        return listTasks
    }

    public async updateTask(taskArgs: TaskArgs) {
        const { data: listTasks } = await api.patch(`/${ROUTE_TASK}/update`, taskArgs)
        return listTasks
    }

    public async deleteTask(taskArgs: Pick<TaskArgs, 'userId' | 'listTasksId' | 'taskId'>) {
        const { data: listTasks } = await api.delete(
            `/${ROUTE_TASK}?userId=${taskArgs.userId}&listTasksId=${taskArgs.listTasksId}&taskId=${taskArgs.taskId}`
        )
        return listTasks
    }

    // public async findOneTaskById(taskArgs: Pick<TaskArgs, 'userId'>) {
    //     const { data: listTasks } = await api.get(`/${ROUTE_TASK}?userId=${taskArgs.userId}`)
    //     return listTasks
    // }

    // public async findAllTasks(taskArgs: Pick<TaskArgs, 'lisId'>) {
    //     const { data: listTasks } = await api.get(`/${ROUTE_TASK}?lisId=${taskArgs.lisId}`)
    //     return listTasks
    // }
}

export default new TaskApi()