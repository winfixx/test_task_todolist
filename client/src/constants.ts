import { StatusTask } from './types/StatusTask'

export const ROUTE_LOGIN = 'login'
export const ROUTE_REGISTRATION = 'registration'
export const ROUTE_AUTH = 'auth'
export const ROUTE_LIST_TASKS = 'list-tasks'
export const ROUTE_TASK = 'task'
export const SERVER_API = 'http://localhost:5000'

export const ACCESS_TOKEN = 'accessToken'
export const STATUS_TASK: StatusTask[] = ['fulfilled', 'in progress', 'pending']

export const PROVIDE_TAGS_LIST_TASKS = 'listTasks'
export const PROVIDE_TAGS_ITEM_TODOLIST = 'itemTodoList'