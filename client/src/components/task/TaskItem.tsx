import * as React from 'react'
import styles from './TaskItem.module.scss'
import { PROVIDE_TAGS_ITEM_TODOLIST, STATUS_TASK } from '../../constants'
import { Task, TaskArgs } from '../../types/Task'
import { useMutation } from 'react-query'
import taskApi from '../../api/task.api'
import { queryClient } from '../../main'
import { StatusTask } from '../../types/StatusTask'
import { useStores } from '../../hooks/useStores'

interface ITaskItemProps {
    index: number
    task: Task
}

const TaskItem: React.FunctionComponent<ITaskItemProps> = ({
    index,
    task
}) => {
    const {userStore} = useStores()
    const [newTitleTask, setNewTitleTask] = React.useState<string>('')
    const [newContentTask, setNewContentTask] = React.useState<string>('')
    const [newStatusTask, setNewStatusTask] = React.useState<StatusTask>(task.status)

    const { mutateAsync: updateTask } = useMutation(
        async (taskArgs: TaskArgs) => await taskApi.updateTask(taskArgs),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROVIDE_TAGS_ITEM_TODOLIST)
            }
        }
    )

    const { mutateAsync: deleteTask } = useMutation(
        async (taskArgs: Pick<TaskArgs, 'userId' | 'listTasksId' | 'taskId'>) => await taskApi.deleteTask(taskArgs),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROVIDE_TAGS_ITEM_TODOLIST)
            }
        }
    )

    const onUpdateTask = async () => {
        await updateTask({ content: newContentTask, status: newStatusTask, title: newTitleTask, listTasksId: task.listTasksId, taskId: task.id, userId: userStore.id })
    }

    const onDeleteTask = async () => {
        await deleteTask({ listTasksId: task.listTasksId, taskId: task.id, userId: userStore.id })
    }

    return (
        <div className={styles.item_task}>
            <span className={styles.index}># {++index}</span>
            <div>
                <div className={styles.status}>
                    <span>Текущий статус: <span className={status === 'fulfilled' ? styles.fulfilled : ''}>{task.status}</span></span>
                </div>
                <div>
                    <h2>{task.title}</h2>
                    <p>{task.content}</p>
                </div>
            </div>
            <div className={styles.change}>
                <div>
                    <select defaultValue={task.status}
                        onChange={e => setNewStatusTask(e.target.value)}
                    >
                        {STATUS_TASK.map(status =>
                            <option key={status}
                                value={status}
                            >
                                {status}
                            </option>
                        )}
                    </select>
                    <input type="text"
                        placeholder='Изменить название задачи'
                        value={newTitleTask}
                        onChange={e => setNewTitleTask(e.target.value)}
                    />
                    <input type="text"
                        placeholder='Изменить описание задачи'
                        value={newContentTask}
                        onChange={e => setNewContentTask(e.target.value)}
                    />
                    <button onClick={onUpdateTask}>Сохранить</button>
                </div>
                <button onClick={onDeleteTask}>Удалить задачу</button>
            </div>
        </div>
    )
}

export default TaskItem
