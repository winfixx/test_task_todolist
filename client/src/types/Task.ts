export interface Task {
    id: number
    title: string
    content: string
    status: 'fulfilled' | 'in progress' | 'pending'
    listTasksId: number
}

export interface TaskArgs extends Omit<Task, 'id'>{
    userId: number
    listTasksId: number
    taskId: number
}