import { Task } from './Task'

export interface ListTasks {
    id: number
    title: string
    tasks: Task[]
}

export interface ListTasksArgs {
    title: ListTasks['title']
    listId: ListTasks['id']
    userId: number
}