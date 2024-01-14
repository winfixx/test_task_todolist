import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import userApi from '../api/user.api'
import { User, UserForm } from '../types/User.type'
import { useStores } from './useStores'

export const useAuth = (isLoginPath: boolean) => {
    const { userStore } = useStores()
    const navigate = useNavigate()

    const { mutateAsync } = useMutation<User, any, UserForm>(
        async (data) => isLoginPath ? await userApi.login(data) : await userApi.registration(data),
        {
            onSuccess: (data) => {
                console.log(data)
                userStore.setIsAuth(true)
                userStore.setUser(data)
                navigate('/')
            },
            onError: error => console.log(error)
        }
    )

    return {
        mutateAsync
    }
}