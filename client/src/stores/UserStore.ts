import { makeAutoObservable } from 'mobx'
import { User } from '../types/User.type'

export class UserStore implements Omit<User, 'accessToken'> {
    id = -1
    email = ''
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser({ email, id }: User) {
        this.id = id
        this.email = email
    }

    get getUser() {
        return {
            id: this.id,
            email: this.email,
            isAuth: this.isAuth
        }
    }
}