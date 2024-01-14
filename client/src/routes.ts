import { ROUTE_LIST_TASKS, ROUTE_LOGIN, ROUTE_REGISTRATION } from './constants'
import Authorization from './page/auth/Authorization'
import ItemTodoList from './page/itemTodoList/ItemTodoList'
import TodoLists from './page/todoLists/TodoLists'

export const routes = [
    {
        path: '',
        Element: TodoLists
    },
    {
        path: `${ROUTE_LIST_TASKS}/:listId`,
        Element: ItemTodoList
    },
    {
        path: ROUTE_LOGIN,
        Element: Authorization
    },
    {
        path: ROUTE_REGISTRATION,
        Element: Authorization
    }
]
