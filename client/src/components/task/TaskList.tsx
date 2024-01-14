import * as React from 'react'
import { ListTasks } from '../../types/ListTasks'
import TaskItem from './TaskItem'

interface ITaskListProps {
    itemTodoList: ListTasks | undefined
}

const TaskList: React.FunctionComponent<ITaskListProps> = ({
    itemTodoList
}) => {
    return (
        <div>
            {itemTodoList?.tasks.map((task, index) =>
                <TaskItem key={task.id}
                    index={index}
                    task={task}
                />
            )}
        </div>
    )
}

export default TaskList
