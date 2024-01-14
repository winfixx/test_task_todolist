import * as React from 'react'
import { useQuery } from 'react-query'
import listTasksApi from '../../api/list-tasks.api'
import { PROVIDE_TAGS_LIST_TASKS } from '../../constants'
import { useStores } from '../../hooks/useStores'
import ItemListTasks from './ItemListTasks'
import styles from './ListTasks.module.scss'

const ListTasks: React.FunctionComponent = () => {
    const { userStore } = useStores()

    const { data: listTasks } = useQuery(
        [PROVIDE_TAGS_LIST_TASKS],
        async () => await listTasksApi.findAllListsTasks({ userId: userStore.id }),
        {}
    )

    return (
        <div className={styles.container}>
            {listTasks?.map(list =>
                <ItemListTasks key={list.id} listTasks={list} />
            )}
        </div>
    )
}

export default ListTasks
