import { ROUTE_LIST_TASKS } from '../constants'
import { ListTasks, ListTasksArgs } from '../types/ListTasks'
import { api } from './api'

class ListTasksApi {
    public async createListTasks(listTasksArgs: Omit<ListTasksArgs, 'listId'>) {
        const { data: listTasks } = await api.post<ListTasks>(`/${ROUTE_LIST_TASKS}`, listTasksArgs)
        return listTasks
    }

    public async updateTitleListTasks(listTasksArgs: ListTasksArgs) {
        const { data: listTasks } = await api.patch<ListTasks>(`/${ROUTE_LIST_TASKS}`, listTasksArgs)
        return listTasks
    }

    public async deleteListTasks(listTasksArgs: Omit<ListTasksArgs, 'title'>) {
        const { data: listTasks } = await api.delete<ListTasks>(
            `/${ROUTE_LIST_TASKS}?listId=${listTasksArgs.listId}&userId=${listTasksArgs.userId}`
        )
        return listTasks
    }

    public async findOneListTasksById(listTasksArgs: Pick<ListTasksArgs, 'listId'>) {
        const { data: listTasks } = await api.get<ListTasks>(`/${ROUTE_LIST_TASKS}/${listTasksArgs.listId}`)
        return listTasks
    }

    public async findAllListsTasks(listTasksArgs: Pick<ListTasksArgs, 'userId'>) {
        const { data: listTasks } = await api.get<ListTasks[]>(`/${ROUTE_LIST_TASKS}?userId=${listTasksArgs.userId}`)
        return listTasks
    }
}

export default new ListTasksApi()