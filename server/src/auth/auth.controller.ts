import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { ResponseUserDto } from 'src/users/dto/response-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Логин' })
    @ApiResponse({ status: 200, type: ResponseUserDto })
    public login(
        @Body() userDto: CreateUserDto
    ) {
        return this.authService.login(userDto)
    }

    @Post('registration')
    @ApiOperation({ summary: 'Регистрация' })
    @ApiResponse({ status: 200, type: ResponseUserDto })
    public registration(
        @Body() userDto: CreateUserDto
    ) {
        return this.authService.registration(userDto)
    }
}
