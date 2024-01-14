import * as React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import listTasksApi from '../../api/list-tasks.api'
import taskApi from '../../api/task.api'
import TaskList from '../../components/task/TaskList'
import { PROVIDE_TAGS_ITEM_TODOLIST } from '../../constants'
import { useStores } from '../../hooks/useStores'
import { queryClient } from '../../main'
import { TaskArgs } from '../../types/Task'
import { ListTasksArgs } from '../../types/ListTasks'

const ItemTodoList: React.FunctionComponent = () => {
    const [titleListTasks, setTitleListTasks] = React.useState<string>('')
    const [titleTask, setTitleTask] = React.useState<string>('')
    const [contentTask, setContentTask] = React.useState<string>('')
    const { listId } = useParams()

    const { userStore } = useStores()

    const { data: itemTodoList } = useQuery(
        [PROVIDE_TAGS_ITEM_TODOLIST],
        async () => await listTasksApi.findOneListTasksById({ listId: listId ? +listId : -1 })
    )

    const { mutateAsync: onChangeTitleListTasks } = useMutation(
        async (listTasksArgs: ListTasksArgs) => await listTasksApi.updateTitleListTasks(listTasksArgs),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROVIDE_TAGS_ITEM_TODOLIST)
            }
        }
    )

    const { mutateAsync: createTask } = useMutation(
        async (taskArgs: Omit<TaskArgs, 'taskId' | 'status'>) => await taskApi.createTask(taskArgs),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROVIDE_TAGS_ITEM_TODOLIST)
            }
        }
    )

    const onCreateTask: React.FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()

        await createTask({ title: titleTask, content: contentTask, listTasksId: listId ? +listId : -1, userId: userStore.id })
    }

    return (
        <div>
            <h1>{itemTodoList?.title}</h1>
            <input type="text"
                placeholder='Изменить название'
                value={titleListTasks}
                onChange={e => setTitleListTasks(e.target.value)}
            />
            <button onClick={async () => await onChangeTitleListTasks({ title: titleListTasks, listId: listId ? +listId : -1, userId: userStore.id })}>Сохранить</button>

            <hr />

            <form action=""
                onSubmit={onCreateTask}
            >
                <input type="text"
                    placeholder='Название задачи'
                    value={titleTask}
                    onChange={e => setTitleTask(e.target.value)}
                />
                <input type="text"
                    placeholder='Описание задачи'
                    value={contentTask}
                    onChange={e => setContentTask(e.target.value)}
                />
                <button>Добавить задачу</button>
            </form>

            <hr />

            <TaskList itemTodoList={itemTodoList} />
        </div>
    )
}

export default ItemTodoList
