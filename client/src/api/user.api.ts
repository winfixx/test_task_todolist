import { ACCESS_TOKEN, ROUTE_AUTH, ROUTE_LOGIN, ROUTE_REGISTRATION } from '../constants'
import { User, UserForm } from '../types/User.type'
import { api } from './api'

class UserApi {
    public async registration(userForm: UserForm) {
        const { data: user } = await api.post<User>(`/${ROUTE_AUTH}/${ROUTE_REGISTRATION}`, userForm)
        localStorage.setItem(ACCESS_TOKEN, user.accessToken)
        return user
    }

    public async login(userForm: UserForm) {
        const { data: user } = await api.post<User>(`/${ROUTE_AUTH}/${ROUTE_LOGIN}`, userForm)
        localStorage.setItem(ACCESS_TOKEN, user.accessToken)
        return user
    }
}

export default new UserApi