import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt/dist'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { User } from 'src/users/users.model'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    public async login(userDto: CreateUserDto) {
        if (!userDto.email || !userDto.password) throw new BadRequestException('Недостаточно данных')

        const user = await this.validateUser(userDto)
        const accessToken = await this.generateToken(user)
        return {
            id: user.id,
            email: user.email,
            accessToken
        }
    }

    public async registration(
        userDto: CreateUserDto
    ) {
        if (!userDto.email || !userDto.password) throw new BadRequestException('Недостаточно данных')

        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException(
                'Пользователь с таким email уже существует',
                HttpStatus.BAD_REQUEST
            )
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)

        const user = await this.userService.createUser({
            ...userDto, password: hashPassword
        })
        const accessToken = await this.generateToken(user)

        return {
            id: user.id,
            email: user.email,
            accessToken
        }
    }

    private async generateToken(
        user: User
    ) {
        const payload = { email: user.email, id: user.id }
        return this.jwtService.sign(payload)

    }

    private async validateUser(
        userDto: CreateUserDto
    ) {
        const user = await this.userService.getUserByEmail(userDto.email)
        if (!user) throw new BadRequestException('Пользователь не найден')
        
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)

        if (user && passwordEquals) {
            return user
        }

        throw new UnauthorizedException({ message: 'Неккоректный email или пароль' })
    }
}
