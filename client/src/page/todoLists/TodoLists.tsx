import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import listTasksApi from '../../api/list-tasks.api'
import ListTasks from '../../components/list-tasks/ListTasks'
import { ACCESS_TOKEN, PROVIDE_TAGS_LIST_TASKS, ROUTE_REGISTRATION } from '../../constants'
import { useStores } from '../../hooks/useStores'
import { useMutation } from 'react-query'
import { ListTasksArgs } from '../../types/ListTasks'
import { queryClient } from '../../main'


const TodoLists: React.FunctionComponent = () => {
    const [titleListTasks, setTitleListTasks] = React.useState<string>('')
    const { userStore } = useStores()
    const navigate = useNavigate()

    const { mutateAsync: createListTasks } = useMutation(
        async (listTasksArgs: Omit<ListTasksArgs, 'listId'>) => await listTasksApi.createListTasks(listTasksArgs),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(PROVIDE_TAGS_LIST_TASKS)
            }
        }
    )

    const onCreateListTasks: React.FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()

        await createListTasks({ title: titleListTasks, userId: userStore.id })
    }

    return (
        <div>
            {!userStore.isAuth
                ? <button onClick={() => navigate(`/${ROUTE_REGISTRATION}`)}
                >
                    Войдите в аккаунт
                </button>
                : <>
                    <form action="" onSubmit={onCreateListTasks}>
                        <input type="text"
                            placeholder='Название списка'
                            value={titleListTasks}
                            onChange={e => setTitleListTasks(e.target.value)}
                        />
                        <button>добавть список задач</button>
                    </form>

                    <hr />

                    <ListTasks />
                </>
            }
        </div>
    )
}

export default TodoLists
