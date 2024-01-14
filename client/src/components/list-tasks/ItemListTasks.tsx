import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_LIST_TASKS } from '../../constants'
import { ListTasks } from '../../types/ListTasks'
import styles from './ItemListTasks.module.scss'

interface IItemListTasksProps {
    listTasks: ListTasks
}

const ItemListTasks: React.FunctionComponent<IItemListTasksProps> = ({
    listTasks
}) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/${ROUTE_LIST_TASKS}/${listTasks.id}`)}
            className={styles.item}
        >
            <span>{listTasks.title}</span>
            <span>{listTasks.tasks.length} (задач)</span>
        </div>
    )
}

export default ItemListTasks