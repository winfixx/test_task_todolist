import axios from 'axios'
import { ACCESS_TOKEN, SERVER_API } from '../constants'

export const api = axios.create({
    baseURL: SERVER_API
})

api.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    return config
})