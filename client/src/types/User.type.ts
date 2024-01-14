export interface User {
    id: number
    email: string
    isAuth: boolean
    accessToken: string
}

export interface UserForm {
    email: string
    password: string
}