import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTE_LOGIN, ROUTE_REGISTRATION } from '../../constants'
import { useAuth } from '../../hooks/useAuth'

const Authorization: React.FunctionComponent = () => {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const location = useLocation()
    const navigate = useNavigate()


    const isLoginPath = location.pathname === `/${ROUTE_LOGIN}`
    const { mutateAsync } = useAuth(isLoginPath)

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        await mutateAsync({ email, password })
    } 

    return (
        <div>
            <form onSubmit={onSubmit}>
                {location.pathname === `/${ROUTE_LOGIN}`
                    ? <span>Войти в аккаунт</span>
                    : <span>Зарегистрироваться</span>
                }
                <input type="email"
                    placeholder='email'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input type="password"
                    placeholder='password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <input type="submit" />
            </form>
            <hr />
            <div>
                {location.pathname === `/${ROUTE_LOGIN}`
                    ? <button onClick={() => navigate(`/${ROUTE_REGISTRATION}`)}>Зарегистрироваться</button>
                    : <button onClick={() => navigate(`/${ROUTE_LOGIN}`)}>Войти</button>
                }
            </div>
        </div>
    )
}

export default Authorization
