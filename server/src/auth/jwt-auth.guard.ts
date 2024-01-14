import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt/dist'
import { User } from 'src/users/users.model'

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException('Пользователь не авторизован')
            }

            const user = this.jwtService.verify<User>(token)
            if (user) {
                return true
            }

            return false

        } catch (error) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован', statusCode: 401 })
        }
    }
}